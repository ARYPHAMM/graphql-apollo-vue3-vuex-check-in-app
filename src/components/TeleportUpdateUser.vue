<template>
  <teleport to="body" :disabled="!popup">
    <div class="modal border-1  shadow-md " v-if="popup">
      <div class="relative">
        <div class="">
          <h1 class="mb-1 font-bold text-2xl text-blue-500 text-center">
            Cập nhật tài khoản
          </h1>
          <div class="flex mb-1">
            <div class="pr-1">
              <b> Tài khoản: </b>
            </div>
            <input
              type="text"
              :disabled="true"
              :class="
                `bg-white outline-none px-2  ${
                  !edit ? '' : ''
                } `
              "
              v-model="user_current.value.username"
            />
          </div>
          <div class="flex mb-1">
            <div class="pr-1">
              <b> Mật khẩu: </b>
            </div>
            <input
              type="password"
              :disabled="edit"
              :class="
                `bg-white outline-none px-2  ${
                  !edit ? 'border rounded-lg border-green-400' : ''
                } `
              "
              v-model="user_current.value.password"
            />
          </div>
          <div class="flex mb-1">
            <div class="pr-1">
              <b> Tên người dùng: </b>
            </div>
            <input
              type="text"
              :disabled="edit"
              :class="
                `bg-white outline-none px-2  ${
                  !edit ? 'border rounded-lg border-green-400' : ''
                } `
              "
               v-model="user_current.value.fullname"
            />
          </div>
          <div class="flex mb-1">
            <div class="pr-1">
              <b class="whitespace-nowrap"> Địa chỉ: </b>
            </div>
            <input
              type="text"
              :disabled="edit"
              :class="
                `bg-white outline-none px-2  ${
                  !edit ? 'border rounded-lg border-green-400' : ''
                } `
              "
              v-model="user_current.value.address"
            />
          </div>
          <div class="flex mb-1">
            <div class="pr-1">
              <b> Giới tính: </b>
            </div>
            <div class="flex items-center">
              <input type="radio" :disabled="edit" value='female' name="gender" class="mr-1" v-model="user_current.value.gender" /> Nam
              <span class="pr-1"></span>
              <input type="radio" :disabled="edit" value='male' name="gender" class="mr-1" v-model="user_current.value.gender" /> Nữ
            </div>
          </div>
        </div>
        <button
          class="absolute top-0 right-3 text-red-500 font-bold"
          @click="
            $emit('close');
            edit = true;
          "
        >
          x
        </button>
        <div class="flex">
          <button
            @click="edit = !edit"
            type="button"
            v-if="edit"
            class="mt-1 px-2 py-1 bg-green-500 text-white shadow-md rounded outline-none"
          >
            Cập nhật
          </button>
          <button
            @click="
              save
            "
            v-if="!edit"
            type="button"
            class="mx-1 mt-1 px-2 py-1 bg-blue-500 text-white shadow-md rounded outline-none"
          >
            Lưu
          </button>
          <button
            @click="cancel"
            v-if="!edit"
            type="button"
            class="mx-1 mt-1 px-2 py-1 bg-red-500 text-white shadow-md rounded outline-none"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive,watch } from "vue";
export default {
  props: ["popup", "user"],
  emits: ["close"],
  setup(props,context) {
    const edit = ref(true);
    let user_current = reactive({});   
    // eslint-disable-next-line no-unused-vars
    watch(props.user,(user,val)=>{
        // user_current.value = { #1
        //   id:  user.value.id,
        //   username:  user.value.username,
        //   fullname:  user.value.fullname
        // };
        // user_current.value = user.value; // sync with value of store
        user_current.value = JSON.parse(JSON.stringify(user.value)); //#2
        user_current.value.password = '';
    });
    const cancel = () => {
        edit.value = true;
    };
    const save = () => {
      edit.value = true;
      context.emit("updateUser",user_current.value);
    };
    return {
      edit,
      user_current,
      cancel,
      save,
    };
  },
};
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 500px;
  height: 300px;
  padding: 5px;
}
</style>
