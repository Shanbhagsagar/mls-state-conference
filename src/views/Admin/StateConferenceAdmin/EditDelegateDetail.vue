<template>
  <div>
    <div class="row card-wrapper">
      <div class="col login-block">
        <div class="card-form">
          <div class="row">
            <div class="d-block text-center">
              <div size="180" class="user">
                <input
                  @change="handleFileChange"
                  ref="fileInput"
                  type="file"
                  style="display: none;"
                />
                <b-avatar
                  size="120"
                  :src="
                    profilePictureUrl
                      ? profilePictureUrl
                      : '../../../public/assets/images/no-image-icon-23485.png'
                  "
                  class="profile-img"
                  badge-variant="info"
                >
                  <template #badge
                    ><i
                      class="bi bi-pencil-square text-white"
                      @click="openFileInput"
                    ></i
                  ></template>
                </b-avatar>
              </div>
            </div>
            <!-- <img @click="openFileInput" class="profile-user-img img-circle" :src="profilePictureUrl ? profilePictureUrl : '../../../public/assets/images/no-image-icon-23485.png'" alt="User"/> -->
          </div>
          <br />
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <label for="designation" class="control-label form-label"
                  >Designation</label
                >
                <span class="text-danger">*</span>

                <!-- <v-select
                  v-model="delegates[0].designation"
                  label="name"
                  placeholder="Please Select your Designation"
                  :options="delegateDesignation"
                  :value="delegates[0].designation.name"
                /> -->
                <!-- <div
                    class="text-danger"
                    v-if="
                      !$v.delegates.designation.required &&
                        $v.delegates.designation.$error">
                    Please Select Designation
                  </div> -->
              </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <div class="form-group">
                <label for="title" class="control-label form-label">
                  Title
                  <span class="text-danger">*</span>
                </label>

                <b-form-select
                  id="input-3"
                  :options="foods"
                  required
                ></b-form-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//@submit="onSubmit"
// {{ this.$route.params.id }}
// https://stackoverflow.com/questions/43839066/how-can-i-set-selected-option-selected-in-vue-js-2
export default {
  data() {
    return {
      form: {
        firstname: this.$route.params.data.firstname,
        middlename: this.$route.params.data.middlename,
        lastname: this.$route.params.data.lastname,
        state: this.$route.params.data.state,
        title: null,
      },
      foods: [this.$route.params.data.title],
      show: true,
    };
  },
  methods: {},
};
</script>

<style></style>
