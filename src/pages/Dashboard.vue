<template>
  <div>
    <h1>To-do app</h1>
    <input
      type="text"
      id="task-name"
      class="inputField"
      ref="taskName"
      placeholder="Enter task name"
    />
    <button class="button primary block" @click="createNewTask">
      New Task
    </button>
    <br />
    <br />
    <input
      type="text"
      id="task-id"
      class="inputField"
      ref="taskId"
      placeholder="Enter task Id"
    />
    <button class="btn btn-danger block" @click="deleteTask">
      Delete Task
    </button>
    <br />
    <button class="btn btn-success block" @click="markTaskAsCompleted">
      Mark Task as Completed
    </button>
    <button class="btn btn-secondary block" @click="markTaskAsInProgress">
      Mark Task as In Progress
    </button>
    <button class="btn btn-info block" @click="markTaskAsPending">
      Mark Task as Pending
    </button>
    <br />

    <CardEdition v-model:editTask="taskToEdit" @saveTask="saveTask" />

    <h2>Pending</h2>
    <ul v-for="task in tasksStore.pendingTasks" :key="task.id">
      <li>
        <b>Id:</b> {{ task.id }} - <b>Title:</b> {{ task.title }} -
        <b>State:</b>
        {{ task.current_state }}
        <button class="btn btn-light" @click="editTask(task.id)">Edit</button>
      </li>
    </ul>
    <h2>In Progress</h2>
    <ul v-for="task in tasksStore.inProcessTasks" :key="task.id">
      <li>
        <b>Id:</b> {{ task.id }} - <b>Title:</b> {{ task.title }} -
        <b>State:</b>
        {{ task.current_state }}
        <button class="btn btn-light" @click="editTask(task.id)">Edit</button>
      </li>
    </ul>
    <h2>Completed</h2>
    <ul v-for="task in tasksStore.completedTasks" :key="task.id">
      <li>
        <b>Id:</b> {{ task.id }} - <b>Title:</b> {{ task.title }} -
        <b>State:</b>
        {{ task.current_state }}
        <button class="btn btn-light" @click="editTask(task.id)">Edit</button>
      </li>
    </ul>
  </div>

  <div class="container">
    <div class="container text-left">
      <div class="row">
        <div class="col rounded-5 col-kanban">
          <h3>Backlog</h3>
          <hr />

          <ul v-for="task in tasksStore.pendingTasks" :key="task.id">
            <div class="card border border-0 mb-3" style="width: 100%">
              <li>
                <div class="card-header">
                  <div class="d-flex justify-content-start">
                    <div class="p-1 mr-auto">
                      <span class="badge text-bg-category">Coding</span>
                    </div>
                    <div class="p-1">
                      <small class="text-muted">#{{ task.id }}</small>
                    </div>
                    <div class="p-1">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </div>
                </div>

                <div class="card-body pt-1 pb-4">
                  <h4 class="card-title">{{ task.title }}</h4>
                </div>

                <div class="card-footer clearfix">
                  <span class="float-left"
                    ><p class="card-text">
                      <small class="text-muted">21 Sept</small>
                    </p></span
                  >
                  <span class="float-left ms-3"
                    ><span class="badge text-bg-warning">Low</span></span
                  >

                  <span class="float-right"
                    ><button
                      type="button"
                      class="btn btn-dark"
                      style="
                        --bs-btn-padding-y: 0.25rem;
                        --bs-btn-padding-x: 0.5rem;
                        --bs-btn-font-size: 0.75rem;
                      "
                      @click="editTask(task.id)"
                    >
                      <font-awesome-icon
                        icon="fa-regular fa-pen-to-square"
                      /></button
                  ></span>
                  <span class="float-right"
                    ><img
                      src="https://via.placeholder.com/28x28"
                      alt="Generic placeholder image"
                      class="img-fluid rounded-circle me-2"
                      style="width: 28px"
                  /></span>
                </div>
              </li>
            </div>
          </ul>
        </div>

        <div class="col rounded-5 col-kanban">
          <h3>In Progress</h3>
          <hr />

          <ul v-for="task in tasksStore.inProcessTasks" :key="task.id">
            <div class="card border border-0 mb-3" style="width: 100%">
              <li>
                <div class="card-header">
                  <div class="d-flex justify-content-start">
                    <div class="p-1 mr-auto">
                      <span class="badge text-bg-category">Coding</span>
                    </div>
                    <div class="p-1">
                      <small class="text-muted">#{{ task.id }}</small>
                    </div>
                    <div class="p-1">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </div>
                </div>

                <div class="card-body pt-1 pb-4">
                  <h4 class="card-title">{{ task.title }}</h4>
                </div>

                <div class="card-footer clearfix">
                  <span class="float-left"
                    ><p class="card-text">
                      <small class="text-muted">21 Sept</small>
                    </p></span
                  >
                  <span class="float-left ms-3"
                    ><span class="badge text-bg-warning">Low</span></span
                  >

                  <span class="float-right"
                    ><button
                      type="button"
                      class="btn btn-dark"
                      style="
                        --bs-btn-padding-y: 0.25rem;
                        --bs-btn-padding-x: 0.5rem;
                        --bs-btn-font-size: 0.75rem;
                      "
                      @click="editTask(task.id)"
                    >
                      <font-awesome-icon
                        icon="fa-regular fa-pen-to-square"
                      /></button
                  ></span>
                  <span class="float-right"
                    ><img
                      src="https://via.placeholder.com/28x28"
                      alt="Generic placeholder image"
                      class="img-fluid rounded-circle me-2"
                      style="width: 28px"
                  /></span>
                </div>
              </li>
            </div>
          </ul>
        </div>

        <div class="col rounded-5 col-kanban">
          <h3>Done</h3>
          <hr />

          <ul v-for="task in tasksStore.completedTasks" :key="task.id">
            <div class="card border border-0 mb-3" style="width: 100%">
              <li>
                <div class="card-header">
                  <div class="d-flex justify-content-start">
                    <div class="p-1 mr-auto">
                      <span class="badge text-bg-category">Coding</span>
                    </div>
                    <div class="p-1">
                      <small class="text-muted">#{{ task.id }}</small>
                    </div>
                    <div class="p-1">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </div>
                </div>

                <div class="card-body pt-1 pb-4">
                  <h4 class="card-title">{{ task.title }}</h4>
                </div>

                <div class="card-footer clearfix">
                  <span class="float-left"
                    ><p class="card-text">
                      <small class="text-muted">21 Sept</small>
                    </p></span
                  >
                  <span class="float-left ms-3"
                    ><span class="badge text-bg-warning">Low</span></span
                  >

                  <span class="float-right"
                    ><button
                      type="button"
                      class="btn btn-dark"
                      style="
                        --bs-btn-padding-y: 0.25rem;
                        --bs-btn-padding-x: 0.5rem;
                        --bs-btn-font-size: 0.75rem;
                      "
                      @click="editTask(task.id)"
                    >
                      <font-awesome-icon
                        icon="fa-regular fa-pen-to-square"
                      /></button
                  ></span>
                  <span class="float-right"
                    ><img
                      src="https://via.placeholder.com/28x28"
                      alt="Generic placeholder image"
                      class="img-fluid rounded-circle me-2"
                      style="width: 28px"
                  /></span>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useTasksStore from "../store/task";
import { useUserStore } from "../store/user";
import CardEdition from "../components/CardEdition.vue";

export default {
  name: "Dashboard",
  components: {
    CardEdition,
  },
  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const taskToEdit = ref(null);
    const tasksStore = useTasksStore();
    const store = useUserStore();
    const createNewTask = () => {
      const newTask = {
        user_id: store.user.id,
        title: taskName.value.value,
      };
      tasksStore.createTask(newTask);
    };
    const editTask = (taskId) => {
      const task = tasksStore.tasks.find((t) => t.id === taskId);
      taskToEdit.value = task;
    };
    const saveTask = (task) => {
      tasksStore.updateTask(
        task.id,
        task.title,
        task.current_state,
        task.priority,
        task.description
      );
    };
    const deleteTask = () => {
      tasksStore.deleteTask(taskId.value.value);
    };
    const markTaskAsCompleted = () => {
      tasksStore.markAsCompleted(taskId.value.value);
    };
    const markTaskAsInProgress = () => {
      tasksStore.markAsInProgress(taskId.value.value);
    };
    const markTaskAsPending = () => {
      tasksStore.markAsPending(taskId.value.value);
    };
    onMounted(() => {
      tasksStore.fetchTasks();
      if (tasksStore.tasks.lengt > 0) taskToEdit.value = tasksStore.tasks[0];
    });
    return {
      taskId,
      taskName,
      tasksStore,
      taskToEdit,
      createNewTask,
      editTask,
      saveTask,
      deleteTask,
      markTaskAsCompleted,
      markTaskAsInProgress,
      markTaskAsPending,
    };
  },
};
</script>

<style scoped>
.col-kanban {
  width: 100%;
  padding: 2rem;
  margin: 0.5rem;
  background-color: #ddd;
  height: 300px;
  overflow: auto;
}

.col-kanban h3 {
  color: var(--custom-color-secondary);
  font-size: 22px;
  text-transform: capitalize;
}

.col-kanban h3:before {
  content: "» ";
}

.col-kanban hr {
  border-top: 3px solid var(--custom-color-secondary);
  opacity: 0.4;
  position: relative;
  top: -18px;
}

ul li {
  list-style: none;
}

ul {
  padding: 0;
}

.card-footer,
.card-header {
  border-bottom: none;
  background-color: var(--bs-card-bg);
}

.card-footer {
  border-top: 1px solid rgb(217, 217, 217);
}

.card-title {
  font-size: 16px;
}

.card-footer {
  padding: 8px 16px;
}

.card-footer-item {
  margin: 0 10px;
}

.badge {
  opacity: 0.7;
}

.badge:hover {
  opacity: 1;
  transition: 0.5s ease-in-out 100ms;
}

.category {
  width: 80%;
}

.p-cat {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: var(--custom-border-radius);
  background-color: var(--bg-color-management);
  color: #fff;
}

.mr-auto {
  margin-right: auto;
}

.text-bg-category {
  color: #000;
  background-color: var(--bg-color-coding);
}

:deep(.fa-pen-to-square path) {
  color: #fff;
}

.form-check-input:checked {
  background-color: #4e94fb;
  border-color: #4e94fb;
}
</style>
