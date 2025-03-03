document.addEventListener("DOMContentLoaded", function () {
    const orderTableBody = document.getElementById("orderTableBody");
    const totalOrders = document.getElementById("totalOrders");
    const pendingOrders = document.getElementById("pendingOrders");
    const completedOrders = document.getElementById("completedOrders");

    function loadOrders() {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let pendingCount = 0;
        let completedCount = 0;

        orderTableBody.innerHTML = "";

        orders.forEach(order => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>Customer ${order.id}</td>
                <td>${order.milkType}</td>
                <td>${order.quantity}L</td>
                <td>${order.deliveryDate}</td>
                <td>${order.status}</td>
                <td>
                    ${order.status === "Pending" ? 
                    `<button onclick="completeOrder(${order.id})">✔ Complete</button>` : 
                    '<span class="completed">✔</span>'}
                    <button onclick="deleteOrder(${order.id})">🗑️ Delete</button>
                </td>
            `;
            orderTableBody.appendChild(row);

            if (order.status === "Pending") pendingCount++;
            else completedCount++;
        });

        totalOrders.textContent = orders.length;
        pendingOrders.textContent = pendingCount;
        completedOrders.textContent = completedCount;
    }

    window.completeOrder = function (orderId) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = "Completed";
            localStorage.setItem("orders", JSON.stringify(orders));
            loadOrders();
        }
    };

    window.deleteOrder = function (orderId) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders = orders.filter(order => order.id !== orderId);
        localStorage.setItem("orders", JSON.stringify(orders));
        loadOrders();
    };

    window.filterOrders = function (status) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let filteredOrders = status === "All" ? orders : orders.filter(order => order.status === status);
        orderTableBody.innerHTML = "";

        filteredOrders.forEach(order => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>Customer ${order.id}</td>
                <td>${order.milkType}</td>
                <td>${order.quantity}L</td>
                <td>${order.deliveryDate}</td>
                <td>${order.status}</td>
            `;
            orderTableBody.appendChild(row);
        });
    };

    loadOrders();
});
