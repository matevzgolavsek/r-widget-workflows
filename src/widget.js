'use strict';

import SetupHtml from './modules/SetupHtml.js';
import BrowserHelper from './modules/BrowserHelper.js';
import Animations from './modules/Animations.js';
import PubSub from './modules/pubsub.js';

// TODO: Remove this popup sample after we implement real db data
// import popupEventSample from "./modules/_popupSample.js";

window['RelayWidget'] = {
  env: ENV,
  current_states: {},
  communications: [],
  config: {},
  embedEnv: {},
  elements: {},
  addNotificationClickableListenerSet: false,
  loopNotifications: true,
  pubsub: undefined,
  current_communication_id: 0,
  initialized: false,

  init: function (publicId, widgetEndpoint) {
    if (this.isInitialized()) {
      console.warn('RelayWidget has already been initialized');
      return;
    }

    if (!publicId) {
      console.error('RelayWidget initialization failed: publicId is required');
      return;
    }

    if (!widgetEndpoint) {
      console.error(
        'RelayWidget initialization failed: widgetEndpoint is required'
      );
      return;
    }

    this.initProperties(publicId, widgetEndpoint);
    this.getWorkspaceData();
    this.pubsub = new PubSub();
    this.initialized = true;
  },

  isInitialized: function () {
    return !!this.initialized;
  },

  initProperties: function (publicId, widgetEndpoint) {
    this['embedEnv'] = {
      publicId: publicId,
      widgetEndpoint: widgetEndpoint
    };
  },

  getWorkspaceData: function () {
    const apiUrl = `${this['embedEnv'].widgetEndpoint}/api/embed/content/${this['embedEnv'].publicId}`;
    console.log('Fetching data from: ' + apiUrl, 1);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Data not found');
          } else if (response.status === 500) {
            throw new Error('Server error');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then((result) => {
        this.config = result.data.config;
        this['communications'] = result.data.communications;
        this.applyConfig();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },

  applyConfig: function () {
    this['current_states']['totalDisplayed'] = 0;
    this.setupHtml();
    this.runNotifications();
    // TODO: Use this function to display popup and after remove this comments
    // popupEventSample is data we will get from db
    // Display Popup (need to decide where we will call this)
    // this.displayPopup(popupEventSample);
  },

  setupHtml() {
    // ENV defined in esbuild.config.js
    if (ENV === 'development') {
      SetupHtml.setupDevStyles();
    } else {
      SetupHtml.setupStyleHtml(this['config']['style_html']);
    }

    SetupHtml.setupNotificationHtml(this['config']['notification_base_html']);
    SetupHtml.setupNotificationWcagHtml(
      this['config']['notification_wcag_html']
    );
  },

  runNotifications: async function () {
    console.log('Running notifications', 1);

    await this.sleep(3000); // Delay before first notification

    for (const communication of this['communications']) {
      this.current_communication_id = communication?.id;
      for (const ev of communication['events']) {
        this.displayNotification(ev);

        await this.sleep(6000); // Time to show notification
        this.hideNotification();
        await this.sleep(5000); // Animation time (2s) + Delay between notifications

        // if (this.notInFocusedFrame()) {
        //   console.log("Not in focused frame", 1);
        //   return;
        // }
      }
    }

    if (this.loopNotifications) {
      this.runNotifications();
    }
  },

  displayNotification: async function (event) {
    this['current_states']['totalDisplayed']++;
    this.buildNotification(event);
    Animations.animateNotificationIn();
    this.emit('seen', this.current_communication_id);
  },

  hideNotification() {
    Animations.animateNotificationOut();
  },

  buildNotification: function (event) {
    this.setNotificationHTML(event);
    this.setNotificationClasses(event);
    this.addNotificationClickableListener(event);
    this.setTimestampClass();
    this.setCloseNotificationListener();
  },

  setNotificationHTML: function (event) {
    const replacedHTML = event['event_html'].replace(
      '{{ time-ago }}',
      this.message_timeago(event)
    );

    this.elements.notificationContentElement.innerHTML = replacedHTML;
  },

  setNotificationClasses: function (event) {
    // Maybe we should add theme class instead of image class
    if (event['image_url']) {
      this.elements.notificationElement.classList.add(
        'relay-notification--has-image'
      );
    } else {
      this.elements.notificationElement.classList.remove(
        'relay-notification--has-image'
      );
    }
  },

  addNotificationClickableListener: function (event) {
    var self = this;
    this.elements.notificationElement.style.cursor = 'pointer';
    if (!this.addNotificationClickableListenerSet) {
      var method = null;
      if (this.elements.notificationElement.addEventListener) {
        method = 'addEventListener';
      } else if (this.elements.notificationElement.attachEvent) {
        method = 'attachEvent';
      }

      if (method) {
        this.elements.notificationElement[method](
          'click',
          (evt) => {
            evt.preventDefault();
            self.emit('clicked', self.current_communication_id);
            self.visitNotificationDestination(event);
          },
          false
        );
      }
    }
    this.addNotificationClickableListenerSet = true;
  },

  visitNotificationDestination: function (event) {
    var url = event['link'];
    window.open(url, '_self');
  },

  setTimestampClass: function () {
    // If .bee-popup-paragraph changes to anything else we need to change this
    const timestampElement = document.querySelector(
      '.relay-notification .bee-popup-block-1.bee-popup-paragraph'
    );

    if (timestampElement) {
      timestampElement.classList.add('relay-notification__timestamp');
    }
  },

  setCloseNotificationListener: function () {
    const closeBtn = document.querySelector('.relay-notification__close');
    const self = this;

    if (!closeBtn) {
      return;
    }

    closeBtn.addEventListener(
      'click',
      function (evt) {
        self.hideNotification();
        self.emit('closed', self.current_communication_id);
        evt.stopPropagation();
      },
      false
    );
  },

  message_timeago: function (ev) {
    const unixTimestamp = ev['created_at_epoch'];
    var p = [
      ['second', 'seconds'],
      ['minute', 'minutes'],
      ['hour', 'hours'],
      ['day', 'days'],
      ['week', 'weeks'],
      ['month', 'months'],
      ['year', 'years']
    ];
    for (
      var u = [60, 60, 24, 7, 4, 12],
        d = Date.now() / 1000 - unixTimestamp,
        c = 0;
      d >= u[c];
      d /= u[c++]
    ) {}
    return (
      'about' + ' ' + ~~d + ' ' + (1 < ~~d ? p[c][1] : p[c][0]) + ' ' + 'ago'
    );
  },

  sleep: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  notInFocusedFrame: function () {
    // We want to stop notifications if not in focused frame
    // Previous iteration was same as notFocusedInDesktop just without check of isMobileDevice
    var notFocusedInDesktop =
      !BrowserHelper.inIframe() &&
      !BrowserHelper.hasFocus() &&
      !BrowserHelper.isMobileDevice();

    // We can only check safari in-app by visibility
    var notFocusedInMobile =
      !BrowserHelper.isVisible() && BrowserHelper.isMobileDevice();

    if (notFocusedInDesktop || notFocusedInMobile) {
      // this.debugLog(
      //   "Notifications are not shown because browser doesn't have focus",
      //   7
      // );
      // this.enqueueShowNotification(1000);
      return true;
    } else {
      return false;
    }
  },

  // Popup
  // TODO: Use this function to display popup
  displayPopup: function (popupEvent) {
    console.log('Running popup');
    // Create popup
    SetupHtml.setupPopupHtml(this['config']['popup_base_html']);

    this.elements.popupContentElement.innerHTML = popupEvent;
    SetupHtml.setupPopupCloseElementHtml(this.elements.popupElement);
    // TODO: Add/Change anonymus id when we get it from pixel
    SetupHtml.populatePopupInputFields(
      this['embedEnv'].publicId,
      'anonymous-id-123'
    );

    setTimeout(() => {
      Animations.animatePopupIn();
      this.elements.popupElement.classList.remove('relay-popup--init');
    }, 1000);

    // TODO: Add communication nodes to listeners and send events
    this.setClosePopupListener();
    this.setPopupSubmitListener();
  },

  setClosePopupListener: function () {
    const closeBtn = document.querySelector('.relay-popup__close');

    closeBtn.addEventListener(
      'click',
      function () {
        Animations.animatePopupOut();
      },
      false
    );
  },

  setPopupSubmitListener: function () {
    const form = document.querySelector('.relay-popup form');

    form.addEventListener(
      'submit',
      function (event) {
        event.preventDefault();
        console.log('Submit form');

        // Send form data
        const formData = new FormData(form);
        // TODO: Change to endpoint where we will send form data (here or in composer config)
        const formUrl = form.getAttribute('action');

        // This can be removed, for now just debugging
        const formDataObj = {};
        formData.forEach((value, key) => {
          formDataObj[key] = value;
        });
        console.log('Form data', formDataObj);

        fetch(formUrl, {
          method: 'POST',
          body: formData
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);

            Animations.animatePopupOut();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
      false
    );
  },

  addEventListener(event, callback) {
    this.pubsub.addEventListener(event, callback);
  },
  removeEventListener(event, callback) {
    this.pubsub.removeEventListener(event, callback);
  },
  emit(event, payload) {
    try {
      // emit securely
      this.pubsub.emit(event, payload);
    } catch (error) {
      console.error(error);
    }
  }
};
