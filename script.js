const arr = [];

      async function onSubmit(event) {
        event.preventDefault();
        let amt = event.target.amount.value;
        let desc = event.target.description.value;
        let category = event.target.category.value;

        let obj = { amt, desc, category };
        try {
          const res = await axios.post(
            "https://crudcrud.com/api/4888569c11a745d2adea76adf8d1f0eb/order",
            obj
          );
          displayDetails(res.data, res.data.category);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      
      async function displayDetails(obj, tableId) {
        const parentElement = document.getElementById(tableId);
        const childElement = document.createElement("li");
        childElement.textContent = `Table_no:${obj.category},  Item:${obj.desc},  Price:${obj.amt}`;
        parentElement.appendChild(childElement);

       
        const btn = document.createElement("input");
        btn.type = "button";
        btn.value = "delete";
        childElement.appendChild(btn);

        btn.onclick = async () => {
          try {
            const res = await axios.delete(
              `https://crudcrud.com/api/4888569c11a745d2adea76adf8d1f0eb/order/${obj._id}`
            );
            console.log("we have deleted", res);
          } catch (err) {
            console.log(err);
          }
          parentElement.removeChild(childElement);
        };
      }

      async function fetchAndDisplayData() {
        try {
          const res = await axios.get(
            "https://crudcrud.com/api/4888569c11a745d2adea76adf8d1f0eb/order"
          );
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].category === "Table1") {
              displayDetails(res.data[i], "Table1");
            } else if (res.data[i].category === "Table2") {
              displayDetails(res.data[i], "Table2");
            } else {
              displayDetails(res.data[i], "Table3");
            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      window.addEventListener("DOMContentLoaded", () => {
        fetchAndDisplayData();
      });