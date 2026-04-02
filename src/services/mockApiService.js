import { transactions as initialData, nextId as initialNextId } from './mockData';

const STORAGE_KEY = 'fintrack_transactions_data';
const ID_KEY = 'fintrack_transactions_next_id';

let data = [];
let currentId = initialNextId;

try {
  const stored = localStorage.getItem(STORAGE_KEY);
  const storedId = localStorage.getItem(ID_KEY);
  if (stored) {
    data = JSON.parse(stored);
    currentId = storedId ? parseInt(storedId, 10) : Math.max(...data.map(d => d.id), 0) + 1;
  } else {
    data = [...initialData];
  }
} catch (e) {
  data = [...initialData];
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(ID_KEY, currentId.toString());
}

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchTransactions() {
  await delay();
  return [...data];
}

export async function addTransaction(tx) {
  await delay(300);
  const newTx = { ...tx, id: currentId++ };
  data.unshift(newTx);
  saveToStorage();
  return newTx;
}

export async function updateTransaction(id, tx) {
  await delay(300);
  const idx = data.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error('Transaction not found');
  data[idx] = { ...data[idx], ...tx };
  saveToStorage();
  return { ...data[idx] };
}

export async function deleteTransaction(id) {
  await delay(300);
  data = data.filter((t) => t.id !== id);
  saveToStorage();
}
