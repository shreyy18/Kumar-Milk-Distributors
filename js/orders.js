document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");
    const deliveryDateInput = document.getElementById("deliveryDate");
    const previewBrand = document.getElementById("previewBrand");
    const previewQuantity = document.getElementById("previewQuantity");
    const previewDate = document.getElementById("previewDate");

    // Prevent past dates
    const today = new Date().toISOString().split("T")[0];
    deliveryDateInput.setAttribute("min", today);

    // Live preview of order details
    document.getElementById("milkType").addEventListener("change", function () {
        previewBrand.textContent = this.value;
    });

    document.getElementById("quantity").addEventListener("input", function () {
        previewQuantity.textContent = this.value;
    });

    document.getElementById("deliveryDate").addEventListener("change", function () {
        previewDate.textContent = this.value;
    });

    // Handle form submission
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let milkType = document.getElementById("milkType").value;
        let quantity = parseInt(document.getElementById("quantity").value);
        let deliveryDate = document.getElementById("deliveryDate").value;

        if (quantity < 1) {
            alert("Quantity must be at least 1 liter.");
            return;
        }

        let newOrder = { 
            id: Date.now(), 
            milkType, 
            quantity, 
            deliveryDate, 
            status: "Pending" 
        };

        // Save order to localStorage
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Order placed successfully!");

        // Reset form and update preview
        orderForm.reset();
        previewBrand.textContent = "-";
        previewQuantity.textContent = "-";
        previewDate.textContent = "-";
    });
});
