document.addEventListener('DOMContentLoaded', function() {
  const colorInput = document.getElementById('tableTextColor');
  const headerBgInput = document.getElementById('tableHeaderBgColor');
  const bodyBgInput = document.getElementById('tableBodyBgColor');

  const updateTableColors = () => {
    const tableHeaders = document.querySelectorAll('.table th');
    const tableCells = document.querySelectorAll('.table td');
    tableHeaders.forEach(th => th.style.color = colorInput.value);
    tableCells.forEach(td => td.style.color = colorInput.value);
  };

  const updateHeaderBgColor = () => {
    const tableHeaders = document.querySelectorAll('.table th');
    tableHeaders.forEach(th => th.style.backgroundColor = headerBgInput.value);
  };

  const updateBodyBgColor = () => {
    const tableBody = document.querySelector('.table tbody');
    if (tableBody) {
      tableBody.style.backgroundColor = bodyBgInput.value;
    }
  };

  if (colorInput) {
    colorInput.addEventListener('input', updateTableColors);
  }
  if (headerBgInput) {
    headerBgInput.addEventListener('input', updateHeaderBgColor);
  }
  if (bodyBgInput) {
    bodyBgInput.addEventListener('input', updateBodyBgColor);
  }
});