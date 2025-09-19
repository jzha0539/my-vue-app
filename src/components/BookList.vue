<template>
  <div class="card mt-3">
    <div class="card-header fw-semibold">Books with ISBN > 1000</div>

    <div class="card-body pb-0">
      <form class="row g-2 align-items-center">
        <div class="col-auto">
          <label class="col-form-label">Order by ISBN</label>
        </div>
        <div class="col-auto">
          <select v-model="orderDir" class="form-select form-select-sm">
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>

        <div class="col-auto">
          <label class="col-form-label">Limit</label>
        </div>
        <div class="col-auto">
          <select v-model.number="limitN" class="form-select form-select-sm">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>

        <div class="col-auto">
          <button type="button" class="btn btn-sm btn-outline-primary" @click="refetch">
            Apply
          </button>
        </div>
      </form>
    </div>

    <div class="table-responsive">
      <table class="table table-dark table-striped align-middle mb-0">
        <thead>
          <tr>
            <th style="width:40%">Name</th>
            <th style="width:25%">ISBN</th>
            <th style="width:35%" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="books.length === 0">
            <td colspan="3" class="text-secondary">No books found.</td>
          </tr>

          <tr v-for="b in books" :key="b.id">
            
            <template v-if="editingId !== b.id">
              <td>{{ b.name }}</td>
              <td>{{ b.isbn }}</td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-warning me-2" @click="startEdit(b)">Edit</button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteBook(b)">Delete</button>
              </td>
            </template>

            
            <template v-else>
              <td>
                <input v-model.trim="editName" type="text" class="form-control form-control-sm" />
              </td>
              <td>
                <input v-model.number="editIsbn" type="number" min="0"
                       class="form-control form-control-sm" />
              </td>
              <td class="text-end">
                <button class="btn btn-sm btn-success me-2" @click="saveEdit(b)">Save</button>
                <button class="btn btn-sm btn-secondary" @click="cancelEdit">Cancel</button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/firebase' 
import {
  collection, query, where, orderBy, limit as limitFn,
  getDocs, doc, updateDoc, deleteDoc
} from 'firebase/firestore'

const books = ref([])

const orderDir = ref('asc')   // 'asc' | 'desc'
const limitN   = ref(10)      // 5 | 10 | 20

const editingId = ref(null)
const editName  = ref('')
const editIsbn  = ref(null)

function buildQuery() {

  return query(
    collection(db, 'books'),
    where('isbn', '>', 1000),
    orderBy('isbn', orderDir.value),
    limitFn(limitN.value)
  )
}

async function refetch() {
  try {
    const q = buildQuery()
    const snap = await getDocs(q)
    const arr = []
    snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
    books.value = arr
  } catch (e) {
    console.error('Error fetching books:', e)
    alert('Fetch error, see console for details.')
  }
}

onMounted(refetch)


function startEdit(b) {
  editingId.value = b.id
  editName.value  = b.name
  editIsbn.value  = b.isbn
}

function cancelEdit() {
  editingId.value = null
  editName.value  = ''
  editIsbn.value  = null
}

async function saveEdit(b) {
  try {
    if (!editName.value || Number.isNaN(Number(editIsbn.value))) {
      alert('Please enter a valid name and numeric ISBN.')
      return
    }
    const refDoc = doc(db, 'books', b.id)
    await updateDoc(refDoc, {
      name: editName.value,
      isbn: Number(editIsbn.value)
    })
    
    b.name = editName.value
    b.isbn = Number(editIsbn.value)
    cancelEdit()
    alert('Updated successfully!')
  } catch (e) {
    console.error('Update error:', e)
    alert('Update failed. See console.')
  }
}

async function deleteBook(b) {
  try {
    if (!confirm(`Delete "${b.name}" ?`)) return
    const refDoc = doc(db, 'books', b.id)
    await deleteDoc(refDoc)
   
    books.value = books.value.filter(x => x.id !== b.id)
    alert('Deleted.')
  } catch (e) {
    console.error('Delete error:', e)
    alert('Delete failed. See console.')
  }
}
</script>