class  GyButton extends HTMLElement {
    #mainDiv;
    #iconSpan;
    #textSpan;

    static formAssociated = true;
    static get observedAttributes() {
        return ['icon', 'text', 'position', 'gap', 'size'];
    }

    constructor() {
        super();
        this.mainDiv = document.createElement('div');
        this.iconSpan = document.createElement('span');
        this.textSpan = document.createElement('span');

        this.mainDiv.className = 'gy-button-content';
        this.iconSpan.className = 'icon';
        this.iconSpan.style.display = 'none';
        this.textSpan.style.display = 'none';
    }
    connectedCallback() {
        this.tabIndex = 0;
        this.mainDiv.appendChild(this.iconSpan);
        this.mainDiv.appendChild(this.textSpan);
        this.appendChild(this.mainDiv);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            this.textSpan.textContent = newValue;
            this.textSpan.style.display = newValue ? 'inline' : 'none';
        }
        else if (name === 'icon') {
            this.iconSpan.innerHTML = '&#x'+ newValue +';';
            this.iconSpan.style.display = newValue ? 'inline' : 'none';
        }
        else if (name === 'position') {
            this.mainDiv.style.flexDirection = newValue;
        }
        else if (name === 'gap') {
            this.mainDiv.style.gap = newValue;
        }
        else if (name === 'size') {
            this.iconSpan.style.fontSize = newValue;
        }
    }
}
customElements.define('gy-button', GyButton);
