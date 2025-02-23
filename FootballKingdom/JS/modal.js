// Función para abrir un modal
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden'; // Previene el scroll del body
}

// Función para cerrar un modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = ''; // Restaura el scroll
}

document.addEventListener('DOMContentLoaded', function() {
    function setupModalTrigger(triggerId, modalId) {
        const trigger = document.getElementById(triggerId);
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(modalId);
            });
        }
    }

    // Asignar eventos a los botones del footer y del mapa del sitio
    setupModalTrigger('terminosLink', 'terminosModal');
    setupModalTrigger('terminosLink2', 'terminosModal');
    setupModalTrigger('privacidadLink', 'privacidadModal');
    setupModalTrigger('privacidadLink2', 'privacidadModal');
    setupModalTrigger('cookiesLink', 'cookiesModal');
    setupModalTrigger('cookiesLink2', 'cookiesModal');

    // Cerrar modales con el botón de cierre
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal.id);
        });
    });

    // Cerrar modales haciendo clic fuera del contenido
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Cerrar modales con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
});
