module.exports = {


  friendlyName: 'View recurring task',


  description: 'Display "Recurring task" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/to-do/recurring-task'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
