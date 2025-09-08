import products from '../data/products.js';

let nextId = products.length + 1;
let currentEditId = null;

function displayProducts(productList) {
  const tableBody = document.getElementById('productTableBody');
  tableBody.innerHTML = '';

  productList.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.country}</td>
      <td><img src="${product.image}" alt="Imagen" style="width:50px; height:auto;" /></td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="openEditModal(${product.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function openEditModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  currentEditId = id;

  document.getElementById('editId').value = product.id;
  document.getElementById('editName').value = product.name;
  document.getElementById('editPrice').value = product.price;
  document.getElementById('editCountry').value = product.country;
  document.getElementById('editImagePreview').src = product.image;

  $('#editModal').modal('show');
}

function saveEditedProduct() {
  const product = products.find(p => p.id === currentEditId);
  if (!product) return;

  const nameInput = document.getElementById('editName');
  const priceInput = document.getElementById('editPrice');
  const countryInput = document.getElementById('editCountry');
  const imageInput = document.getElementById('editImageFile');

  const newName = nameInput.value.trim();
  const newPrice = parseInt(priceInput.value);
  const newCountry = countryInput.value.trim();
  const newImageFile = imageInput.files[0];

  if (!newName) {
    alert('El nombre no puede estar vacío.');
    nameInput.focus();
    return;
  }

  if (isNaN(newPrice) || newPrice <= 0) {
    alert('El precio debe ser mayor a cero.');
    priceInput.focus();
    return;
  }

  if (!newCountry) {
    alert('El país no puede estar vacío.');
    countryInput.focus();
    return;
  }

  product.name = newName;
  product.price = newPrice;
  product.country = newCountry;
  if (newImageFile) {
    product.image = URL.createObjectURL(newImageFile);
  }

  displayProducts(products);
  $('#editModal').modal('hide');
}

function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    displayProducts(products);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const countryInput = document.getElementById('productCountry');
    const imageInput = document.getElementById('productImageFile');

    const name = nameInput.value.trim();
    const price = parseInt(priceInput.value);
    const country = countryInput.value.trim();
    const imageFile = imageInput.files[0];

    if (!name) {
      alert('El nombre no puede estar vacío.');
      nameInput.focus();
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert('El precio debe ser mayor a cero.');
      priceInput.focus();
      return;
    }

    if (!country) {
      alert('El país no puede estar vacío.');
      countryInput.focus();
      return;
    }

    if (!imageFile) {
      alert('Debes seleccionar una imagen.');
      imageInput.focus();
      return;
    }

    const imageUrl = URL.createObjectURL(imageFile);

    const newProduct = {
      id: nextId++,
      name,
      price,
      country,
      image: imageUrl
    };

    products.push(newProduct);
    displayProducts(products);
    this.reset();
  });

  const saveEditBtn = document.getElementById('saveEditBtn');
  if (saveEditBtn) {
    saveEditBtn.addEventListener('click', saveEditedProduct);
  }

  const searchBar = document.getElementById('searchBar');
  if (searchBar) {
    searchBar.addEventListener('input', () => {
      const searchInput = searchBar.value.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
      );
      displayProducts(filtered);
    });
  }

  displayProducts(products);
  window.openEditModal = openEditModal;
  window.deleteProduct = deleteProduct;
});