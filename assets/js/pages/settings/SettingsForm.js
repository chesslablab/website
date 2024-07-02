import AbstractComponent from "../../AbstractComponent.js";

export class SettingsForm extends AbstractComponent {
	mount() {
		this.el.querySelector('select[name="locale"]').value =
			localStorage.getItem("local") || "en";

		if (localStorage.getItem("theme") === "dark") {
			this.el.querySelector('select[name="theme"]').value = "dark";
		} else {
			this.el.querySelector('select[name="theme"]').value = "light";
		}

		if (localStorage.getItem("format") === "table") {
			this.el.querySelector('select[name="format"]').value = "table";
		} else {
			this.el.querySelector('select[name="format"]').value = "inline";
		}

		if (localStorage.getItem("notation") === "san") {
			this.el.querySelector('select[name="notation"]').value = "san";
		} else {
			this.el.querySelector('select[name="notation"]').value = "fan";
		}

		if (localStorage.getItem("set") === "staunty") {
			this.el.querySelector('select[name="set"]').value = "staunty";
		} else {
			this.el.querySelector('select[name="set"]').value = "classical";
		}

		this.el.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(this.el);
			localStorage.setItem("locale", formData.get("locale"));
			localStorage.setItem("theme", formData.get("theme"));
			localStorage.setItem("format", formData.get("format"));
			localStorage.setItem("notation", formData.get("notation"));
			localStorage.setItem("set", formData.get("set"));
			window.location.reload();
		});
	}
}

export const settingsForm = new SettingsForm(
	document.getElementById("settingsForm")
);
