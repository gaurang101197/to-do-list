module.exports = {


  friendlyName: 'View to do home',


  description: 'Display "To do home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/to-do/to-do-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
