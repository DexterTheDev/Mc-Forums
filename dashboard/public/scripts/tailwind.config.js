tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#012949",
                    200: "#024376",
                    300: "#035CA3",
                    400: "#0476D0",
                    500: "#088FFA",
                    600: "#35A4FB",
                    700: "#62B8FC"
                },
                secondary: {
                    100: "#36454F",
                    200: "#495D6A",
                    300: "#5B7586",
                    400: "#718C9E",
                    500: '#8CA2B0',
                    600: "#A7B8C3",
                    700: "#C3CED6"
                },
            }
        },
        fontFamily: {
            body: ["Nunito"]
        }
    }
}

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});