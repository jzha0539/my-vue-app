<template>
  <DataTable :value="books" :loading="loading" responsiveLayout="scroll" size="sm" class="border rounded">
    <template #empty>
      <div class="text-muted p-3">No books found.</div>
    </template>
    <Column field="name" header="Name" sortable />
    <Column field="isbn" header="ISBN" sortable />
  </DataTable>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { db } from '../firebase/firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
let unsub

onMounted(() => {
  const q = query(collection(db, 'books'), where('isbn', '>', 1000), orderBy('isbn', 'asc'))
  unsub = onSnapshot(q, snap => {
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    loading.value = false
  }, () => (loading.value = false))
})

onUnmounted(() => unsub && unsub())
</script>