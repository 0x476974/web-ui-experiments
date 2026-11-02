class GyRadio extends HTMLElement {
    static formAssociated = true;
    static get observedAttributes() {
        return ['text', 'value', 'state'];
    }
    static silentChanging = false;

    constructor() {
        super();
        this.internals = this.attachInternals();
    }
    connectedCallback() {
        this.tabIndex = 0;
        this.addEventListener('click', this.onClick);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.onClick);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (GyRadio.silentChanging) {
            return;
        }

        if (name === 'text') {
            this.textContent = newValue;
        }
        else if (name === 'value') {
            this.updateFormValue();
        }
        else if (name === 'state' && oldValue !== newValue) {
            this.uncheckOther();
            this.updateFormValue();
            this.onChange();
        }
    }
    onClick = () => {
        this.setAttribute('state', 'checked');
    };
    onChange() {
        const changeEvent = new CustomEvent('change', {
            detail: {
                state: this.getAttribute('state'),
                value: this.getAttribute('value')
            }
        });
        this.dispatchEvent(changeEvent);
    }
    updateFormValue() {
        let state = this.getAttribute('state');
        let value = this.getAttribute('value');

        value = value ? value : 'on';

        if (state === 'checked') {
            this.internals.setFormValue(value);
        }
    }
    uncheckOther() {
        const name = this.getAttribute('name');
        const all = document.querySelectorAll(`gy-radio[name="${name}"]`);

        GyRadio.silentChanging = true;
        all.forEach(item => {
            if (item !== this) {
                item.setAttribute('state', 'unchecked');
            }
        });
        GyRadio.silentChanging = false;
    }
}
customElements.define('gy-radio', GyRadio);
