<template>

  <div class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-6 col-xl-8">

          <div class="card" style="border-radius: 15px;">
            <div class="card-body text-center">

              <form class="form-widget" @submit.prevent="updateProfile">

                <div class="container">

                  <div class="row">
                      <div class="col-xl-4">
                    <img
                      v-if="avatar_url !== ``"
                      :src="`https://myirmalszrpixdsvjfdv.supabase.co/storage/v1/object/public/avatars/${avatar_url}`"
                      alt="Profile photo"
                      style="height: 200px"
                    />
                    <img v-else src="../assets/defaultAvatar.jpg" alt="Profile photo" />
                    <label for="avatar">Update your profile photo</label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/png,
                    image/jpeg"
                      @change="updatePicture()"
                    />
                  </div>
                  <div class="col-xl-8">
                    <label for="email">Email</label>
                    <input id="email" type="text" :value="store.user.email" disabled />
                  
                  
                    <label for="username">Name</label>
                    <input id="username" type="text" v-model="username" />
                  
                  
                    <label for="website">Website</label>
                    <input id="website" type="website" v-model="website" />
                  

                  
                    <input
                      type="submit"
                      class="button primary block"
                      :value="loading ? 'Loading ...' : 'Update'"
                      :disabled="loading"
                    />
                  

                  
                    <button class="button block" @click="signOut" :disabled="loading">
                      Sign Out
                    </button>
                  </div>


                </div>
                
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const loading = ref(true);
    const username = ref("");
    const website = ref("");
    const avatar_url = ref("");
    const store = useUserStore();

    async function getProfile() {
      try {
        loading.value = true;

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
          website.value = data.website;
          avatar_url.value = data.avatar_url;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;

        const updates = {
          id: store.user.id,
          username: username.value,
          website: website.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });

        console.log(error);

        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updatePicture() {
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = store.user.email + "." + fileExt;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      if (error) {
        console.log(error);
      } else {
        const { error } = await supabase
          .from("profiles")
          .update({ avatar_url: filePath })
          .eq("id", store.user.id);
        if (error) {
          console.log(error);
        } else {
          alert("profile actualizado");
        }
      }
      return filePath;
    }

    async function signOut() {
      try {
        loading.value = true;
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      store,
      loading,
      username,
      website,
      avatar_url,

      updateProfile,
      updatePicture,
      signOut,
    };
  },
};
</script>

<style scoped>
</style>