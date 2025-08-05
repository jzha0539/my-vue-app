<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <!-- row 1: Username + Gender -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                v-model="formData.username"
                @blur="validateName(true)"
                @input="validateName(false)"
              />
              <div v-if="errors.username" class="text-danger small mt-1">
                {{ errors.username }}
              </div>
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @blur="validateGender(true)"
                @change="validateGender(false)"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger small mt-1">
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <!-- row 2: Password + Confirm Password -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="formData.password"
                @blur="validatePassword(true)"
                @input="onPasswordInput"
              />
              <div v-if="errors.password" class="text-danger small mt-1">
                {{ errors.password }}
              </div>
            </div>

            <div class="col-md-6">
              <label for="confirmPassword" class="form-label">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                class="form-control"
                v-model="formData.confirmPassword"
                @blur="validateConfirmPassword(true)"
                @input="onPasswordInput"
              />
              <div v-if="errors.confirmPassword" class="text-danger small mt-1">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <!-- row 3: Resident -->
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                  @change="validateResident(true)"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
              <div v-if="errors.resident" class="text-danger small mt-1">
                {{ errors.resident }}
              </div>
            </div>
          </div>
         
          <!-- reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              v-model="formData.reason"
              @blur="validateReason(true)"
              @input="validateReason(false)"
            ></textarea>

            <div v-if="errors.reason" class="text-danger small mt-1">
              {{ errors.reason }}
            </div>
            <div
              v-else-if="/\bfriend\b/i.test(formData.reason || '')"
              class="text-success small mt-1"
            >
              Great to have a friend
            </div>
           </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2" :disabled="hasErrors">
              Submit
            </button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>

        <!-- PrimeVue DataTable -->
        <DataTable
          v-if="submittedCards.length"
          :value="submittedCards"
          class="mt-4"
          dataKey="username"
          responsive-layout="scroll"
        >
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column
            field="isAustralian"
            header="Australian Resident"
            :body="row => (row.isAustralian ? 'Yes' : 'No')"
          />
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const reasonHint = ref('')

const validateName = (blur) => {
  const name = formData.value.username.trim()
  if (name.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8

  const hasUppercase   = /[A-Z]/.test(password)
  const hasLowercase   = /[a-z]/.test(password)
  const hasNumber      = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const onPasswordInput = () => {
  validatePassword(false)
  validateConfirmPassword(false)
}

const validateConfirmPassword = (blur) => {
  const { password, confirmPassword } = formData.value

  if (!confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Please confirm your password.'
    else errors.value.confirmPassword = null
  } else if (password !== confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}


const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'Please confirm residency (tick the checkbox).'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const reason = (formData.value.reason || '').trim()
  const hasFriendWord = /\bfriend\b/i.test(reason)

  reasonHint.value = ''  

  if (!reason) {
    if (blur) errors.value.reason = 'Reason is required.'
  } else {
    errors.value.reason = null
    if (hasFriendWord) {
      reasonHint.value = 'Great to have a friend'
    }
  }
}

const submitForm = () => {
  validateName(true)
  validateGender(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident(true)
  validateReason(true)

 
  if (
    !errors.value.username &&
    !errors.value.gender &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.reason
  ) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }

  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
  }

  reasonHint.value = ''
}


const hasErrors = computed(() =>
  !!(errors.value.username ||
     errors.value.password ||
     errors.value.confirmPassword ||
     errors.value.resident ||
     errors.value.gender ||
     errors.value.reason)
)
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}
.card-header {
  background-color: #275FDA;
  color: #fff;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item { padding: 10px; }
</style>