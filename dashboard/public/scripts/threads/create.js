const submitThread = () => {
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            threadName: document.getElementById("threadName").value,
            threadContent: easyMDE.value(),
            type: document.getElementById("type").innerText,
            Tos: document.getElementById("check").checked
        }),
        url: `/threads/${document.getElementById("type").innerText}/create`,
        dataType: "json",
        contentType: 'application/json',
        success: (res) => {
            if (res.error) tata.error("Error Occurred", res.message)
            else {
                tata.success("Success", res.message);
                location.href = `/thread/${res.id}`
            }
        }
    });
}