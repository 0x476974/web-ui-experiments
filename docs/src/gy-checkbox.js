class GyCheckbox extends HTMLElement {
    static formAssociated = true;
    static get observedAttributes() {
        return ['text', 'value', 'state'];
    }

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
        if (name === 'text') {
            this.textContent = newValue;
        }
        else if (name === 'value') {
            this.updateFormValue();
        }
        else if (name === 'state') {
            this.updateFormValue();
            this.onChange();
        }
    }
    onClick = () => {
        let state = this.getAttribute('state');
        state = state === 'checked' ? 'unchecked' : 'checked';
        this.setAttribute('state', state);
    };
    onChange() {
        const changeEvent = new CustomEvent('change', {
            detail: {
                state: this.getAttribute('state')
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
        else {
            this.internals.setFormValue(null);
        }
    }
}
customElements.define('gy-checkbox', GyCheckbox);
