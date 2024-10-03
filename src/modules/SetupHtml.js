export default {
  setupDevStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles.css';
    document.head.appendChild(link);
    link.onerror = (error) => {
      console.error('Error loading stylesheet:', error);
    };
  },

  setupStyleHtml(styles) {
    window.document.head.insertAdjacentHTML('beforeend', styles);
  },

  setupNotificationHtml(notificationHtml) {
    window.document.body.insertAdjacentHTML('beforeend', notificationHtml);

    const notificationElement =
      window.document.getElementById('relay-notification');

    const contentElement = notificationElement.querySelector(
      '.relay-notification__content'
    );

    const closeElement =
      this.setupNotificationCloseElementHtml(notificationElement);

    window.RelayWidget['elements']['notificationElement'] = notificationElement;
    window.RelayWidget['elements']['notificationContentElement'] =
      contentElement;
    window.RelayWidget['elements']['notificationCloseElement'] = closeElement;
  },

  setupNotificationWcagHtml(wcagHtml) {
    // wcag: let's try to attach the wcag section before footer, if not available we put it just below body end
    const footer = document.getElementsByTagName('footer')[0];
    if (footer) {
      footer.insertAdjacentHTML('beforebegin', wcagHtml);
    } else {
      window.document.body.insertAdjacentHTML('beforeend', wcagHtml);
    }
  },

  setupNotificationCloseElementHtml(notificationElement) {
    const closeElementHtml =
      window.RelayWidget['config']['notification_close_element_html'];

    notificationElement.insertAdjacentHTML('beforeEnd', closeElementHtml);

    const closeElement = notificationElement.querySelector(
      '.relay-notification__close'
    );

    return closeElement;
  },

  setupPopupHtml(popupHtml) {
    window.document.body.insertAdjacentHTML('beforeend', popupHtml);

    const popupElement = window.document.getElementById('relay-popup');
    const contentElement = popupElement.querySelector('.relay-popup__content');

    window.RelayWidget['elements']['popupElement'] = popupElement;
    window.RelayWidget['elements']['popupContentElement'] = contentElement;
  },

  setupPopupCloseElementHtml(popupElement) {
    const closeElementHtml =
      window.RelayWidget['config']['popup_close_element_html'];
    const beeContainer = popupElement.querySelector('.bee-popup-container');
    const closeElement = popupElement.querySelector('.relay-popup__close');

    window.RelayWidget['elements']['popupCloseElement'] = closeElement;
    beeContainer.insertAdjacentHTML('beforeEnd', closeElementHtml);
  },

  populatePopupInputFields(publicId, anonymousId) {
    const publicIdInput = window.document.querySelector(
      'input[name="relay_public_id"]'
    );
    const anonymousIdInput = window.document.querySelector(
      'input[name="relay_anonymous_id"]'
    );

    publicIdInput.value = publicId;
    anonymousIdInput.value = anonymousId;
  }
};
