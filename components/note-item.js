class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set note(data) {
        this._data = data;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .daftar-catatan {
                    background: white;
                    padding: 15px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    min-height: 150px;
                }
                .daftar-catatan h2 {
                    font-size: 1.2em;
                    color: #6a0dad;
                    margin: 0;
                }
                .daftar-catatan p {
                    font-size: 0.9em;
                }
                .daftar-catatan button {
                    margin-top: 10px;
                    margin-right: 5px;
                }   
                .delete {
                    padding: 8px;
                    background-color: rgb(225, 43, 37);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    align-items: center; 
                    font-size: 13px;
                }
                .delete:hover {
                    background: rgb(255, 50, 50); /* Warna merah cerah */
                    color: white;
                }
            </style>

            <div class="daftar-catatan">
                <h2>${this._data.title}</h2>
                <p>${this._data.body}</p>
                <small>${new Date(this._data.createdAt).toLocaleString()}</small>
                <div>
                    <button class="delete">Delete</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.delete').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('noteDeleted', {
                detail: this._data,
                bubbles: true, 
                composed: true
            }));
        });
    }
}

customElements.define('note-item', NoteItem);
