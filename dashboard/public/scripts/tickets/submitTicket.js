const submitTicket = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            name: document.getElementById("name").value,
            priority: document.getElementById("priority").value,
            category: document.getElementById("category").value,
            reason: document.getElementById("reason").value
        }),
        url: `/tickets/create`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.href = `/ticket/${res.id}`
            }
        }
    });
}