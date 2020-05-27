parasails.registerPage('to-do-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // return {
    currentDate: '',
    date: '',
    newTaskId: "newTaskId",
    newTaskTip: "Type here to add new task...",
    // TO_DO_ELEMENT: "todo-element-",
    // DONE_ELEMENT: "done-element-",
    TASK_ID: "task-",
    dailyTasks: [],
    getDailyTasksRequestBaseUrl: "http://localhost:1337/api/task/getDailyTaskList?date=${date}",
    updateDailyTasksUrl: "http://localhost:1337/api/task/updateTask",
    addTaskUrl: "/api/task/addTask",
    // updateDailyTasks
    // }
  },

  computed: {
    // a computed properties
    isContentEditable: function () {
      // `this` points to the vm instance
      return this.date<=this.currentDate;
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.currentDate = this.formatDate(new Date())
    this.date = this.currentDate;
    // this.date = '2020-01-02';
    this.loadDailyTasks();
  },

  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    loadDailyTasks: function () {
      let getDailyTasksUrl = `http://localhost:1337/api/task/getDailyTaskList?date=${this.date}`;
      // let getDailyTasksUrl = this.getDailyTasksRequestBaseUrl.replace("${date}", ``,this.date);
      axios.get(getDailyTasksUrl).then(response => (this.dailyTasks = response.data.tasks))
        .catch(error => this.handleAxiosError(error));
    },

    updateDailyTaskInDb: function (updatedTaskId, updatedTaskInfo) {
      let requestData = {
        "taskId": updatedTaskId,
        "type": 'DAILY',
        "task": updatedTaskInfo,
      }
      console.log(requestData);
      axios.put(this.updateDailyTasksUrl, requestData).catch(error => this.handleAxiosError(error));
    },

    addDailyTaskInDb: function (name) {
      let type = 'ADHOC';
      if (this.date > this.currentDate) {
        type = 'SCHEDULED';
      }
      let requestData = {
        "type": type,
        "name": name,
        "date": this.date,
      }
      return axios.put(this.addTaskUrl, requestData).then(response => {
        console.log("New task''s id: ", response.data.taskId)
        return response.data.taskId;
      }).catch(error => this.handleAxiosError(error));
    },

    handleAxiosError: function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    },

    updateTaskName: function (index) {
      let id = this.TASK_ID + index;
      let newTaskName = document.getElementById(id).textContent.trim();
      this.dailyTasks[index].name = newTaskName;
      document.getElementById(id).blur();
      this.updateDailyTaskInDb(this.dailyTasks[index].taskId, { "name": this.dailyTasks[index].name });
    },

    addDailyTask: function () {
      let id = this.newTaskId + this.dailyTasks.length;
      let newTaskName = document.getElementById(id).textContent.trim();
      if (typeof newTaskName !== 'undefined' && newTaskName.length != 0) {
        this.addDailyTaskInDb(newTaskName).then((taskId) => {
          console.log('taskId in vue object: ', taskId);
          let temp = {
            "taskId": taskId,
            // "userId": 1,
            "type": "ADHOC",
            "name": newTaskName,
            "isDone": false,
            "isActive": true
          }
          this.dailyTasks.push(temp);
          document.getElementById(id).id = this.newTaskId + this.dailyTasks.length;
          id = this.newTaskId + this.dailyTasks.length;
          document.getElementById(id).textContent = null;
          document.getElementById(id).blur();
        }).catch((error) => {
          console.log(error);
        });
      }
    },

    removeDailyTask: function (index) {
        this.dailyTasks[index].isActive = false;
        this.updateDailyTaskInDb(this.dailyTasks[index].taskId, { "isActive": this.dailyTasks[index].isActive });
    },

    markDailyTaskDone: function (index) {
        this.dailyTasks[index].isDone = true;
        this.updateDailyTaskInDb(this.dailyTasks[index].taskId, { "isDone": this.dailyTasks[index].isDone });
    },

    markDailyTaskUndone: function (index) {
        this.dailyTasks[index].isDone = false;
        this.updateDailyTaskInDb(this.dailyTasks[index].taskId, { "isDone": this.dailyTasks[index].isDone });
    },

    formatDate: function (currentDate) {
      let month = '' + (currentDate.getMonth() + 1),
        day = '' + currentDate.getDate(),
        year = currentDate.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [year, month, day].join('-');
    }
  }
});
