// It is used to update the code which is edited by the user
const id = window.location.pathname.split("/")[2];
  const formData = new URLSearchParams();
  document.getElementById("saveBtn")
  .addEventListener("click", (event) => {
      console.log("Clicked")
      formData.append('code', editor.getValue());
      console.log(formData);
      fetch(`/virtuallab/${id}`, {
        method : "PUT",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body : formData
      })
      .then(d => {
        return d.json();
      })
      .then(res => {
        const {updated} = res;
        if(updated) {
            window.location.reload();
        }
      })
  })