export default {
  animateNotificationIn: function () {
    window.RelayWidget['elements']['notificationElement'].classList.remove(
      'relay-notification--init',
      'relay-notification--hide'
    );
    window.RelayWidget['elements']['notificationElement'].classList.add(
      'relay-notification--show',
      'relay-notification--animation-horizontal',
      'relay-notification--position-bottom-left'
    );
  },

  animateNotificationOut: function () {
    window.RelayWidget['elements']['notificationElement'].classList.remove(
      'relay-notification--show'
    );
    window.RelayWidget['elements']['notificationElement'].classList.add(
      'relay-notification--hide'
    );
  },

  animatePopupIn: function () {
    window.RelayWidget['elements']['popupElement'].classList.remove(
      'relay-popup--hide'
    );
    window.RelayWidget['elements']['popupElement'].classList.add('relay-popup--show');
  },

  animatePopupOut: function () {
    window.RelayWidget['elements']['popupElement'].classList.remove(
      'relay-popup--show'
    );
    window.RelayWidget['elements']['popupElement'].classList.add('relay-popup--hide');
  },
};
