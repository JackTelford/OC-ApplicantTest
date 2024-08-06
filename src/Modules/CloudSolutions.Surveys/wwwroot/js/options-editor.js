/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

function initializeOptionsEditor(elem, data, defaultValue, modalBodyElement, tableTemplate, modalTemplate) {
  var previouslyChecked;
  var store = {
    debug: false,
    state: {
      options: data,
      selected: defaultValue
    },
    addOption: function addOption() {
      if (this.debug) {
        console.log('add option triggered');
      }
      ;
      this.state.options.push({
        name: '',
        value: ''
      });
    },
    removeOption: function removeOption(index) {
      if (this.debug) {
        console.log('remove option triggered with', index);
      }
      ;
      this.state.options.splice(index, 1);
    },
    getOptionsFormattedList: function getOptionsFormattedList() {
      if (this.debug) {
        console.log('getOptionsFormattedList triggered');
      }
      ;
      return JSON.stringify(this.state.options.filter(function (x) {
        return !IsNullOrWhiteSpace(x.name);
      }));
    }
  };
  var optionsTable = {
    template: tableTemplate || '#options-table',
    props: ['data'],
    name: 'options-table',
    methods: {
      add: function add() {
        store.addOption();
      },
      remove: function remove(index) {
        store.removeOption(index);
      },
      uncheck: function uncheck(index) {
        if (index == previouslyChecked) {
          $('#customRadio_' + index)[0].checked = false;
          store.state.selected = null;
          previouslyChecked = null;
        } else {
          previouslyChecked = index;
        }
      },
      getOptionsFormattedList: function getOptionsFormattedList() {
        return store.getOptionsFormattedList();
      }
    }
  };
  var optionsModal = {
    template: modalTemplate || '#options-modal',
    props: ['data'],
    name: 'options-modal',
    methods: {
      getOptionsFormattedList: function getOptionsFormattedList() {
        return store.getOptionsFormattedList();
      },
      showModal: function showModal() {
        optionsModal.props.data.modal = new bootstrap.Modal(modalBodyElement[0]);
        optionsModal.props.data.modal.show();
      },
      closeModal: function closeModal() {
        optionsModal.props.data.modal.hide();
      }
    }
  };
  new Vue({
    components: {
      optionsTable: optionsTable,
      optionsModal: optionsModal
    },
    data: {
      sharedState: store.state
    },
    el: elem,
    methods: {
      showModal: function showModal() {
        optionsModal.methods.showModal();
      }
    }
  });
}
function IsNullOrWhiteSpace(str) {
  return str === null || str.match(/^ *$/) !== null;
}