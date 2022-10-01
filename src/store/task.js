import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useAlertStore } from "./alert";
import TaskStateEnum from "../enums/TaskStateEnum";

const alertStore = useAlertStore();

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    pendingTasks: (state) =>
      state.tasks.filter((task) => task.current_state == TaskStateEnum.PENDING),
    inProcessTasks: (state) =>
      state.tasks.filter(
        (task) => task.current_state == TaskStateEnum.IN_PROGRESS
      ),
    completedTasks: (state) =>
      state.tasks.filter(
        (task) => task.current_state == TaskStateEnum.COMPLETED
      ),
  },
  actions: {
    async fetchTasks() {
      alertStore.clear();
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select()
        .order("id", { ascending: false });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        this.tasks = tasks;
      }
    },
    async createTask(newTask) {
      alertStore.clear();
      const { data: taskCreated, error } = await supabase
        .from("tasks")
        .insert([newTask]);
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskCreated[0].id} created!`);
        this.tasks.push(taskCreated[0]);
      }
    },
    async updateTask(taskId, title, state, priority, desc) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          current_state: state,
          priority: priority,
          description: desc,
        })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId ? data[0] : task
        );
      }
    },
    async deleteTask(taskId) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} deleted!`);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      }
    },
    async markAs(state, taskId) {
      alertStore.clear();
      const { data, error } = await supabase
        .from("tasks")
        .update({ current_state: state })
        .match({ id: taskId });
      if (error) {
        console.log(error);
        alertStore.error();
      } else {
        alertStore.success(`Task ${taskId} state updated!`);
        this.tasks = this.tasks.map((task) =>
          task.id == taskId ? data[0] : task
        );
      }
    },
  },
});
