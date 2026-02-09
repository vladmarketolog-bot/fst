document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('case-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = document.getElementById('close-modal');
    const cards = document.querySelectorAll('.case-card');

    // UI Elements in Modal
    const mIconContainer = document.getElementById('m-icon-container');
    const mIcon = document.getElementById('m-icon');
    const mCategory = document.getElementById('m-category');
    const mTitle = document.getElementById('m-title');
    const mDescription = document.getElementById('m-description');
    const mMetricValue = document.getElementById('m-metric-value');
    const mMetricLabel = document.getElementById('m-metric-label');
    const mMetricContainer = document.getElementById('m-metric-container');

    // Color maps
    const colors = {
        cyan: { bg: 'bg-cyan-900/30', text: 'text-cyan-300', border: 'border-cyan-500/30' },
        green: { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-500/30' },
        purple: { bg: 'bg-purple-900/30', text: 'text-purple-300', border: 'border-purple-500/30' },
        blue: { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-500/30' },
        orange: { bg: 'bg-orange-900/30', text: 'text-orange-300', border: 'border-orange-500/30' },
        indigo: { bg: 'bg-indigo-900/30', text: 'text-indigo-300', border: 'border-indigo-500/30' },
    };

    function openModal(card) {
        const data = card.dataset;
        const color = colors[data.color] || colors.blue;

        // Populate Header & Basic Info
        mCategory.textContent = data.category;
        mTitle.textContent = data.title;

        // Styling based on color
        mIconContainer.className = `p-3 rounded-xl ${color.bg} ${color.text} mb-4 w-fit`;
        mIcon.setAttribute('data-lucide', data.icon);
        mCategory.className = `text-xs font-bold uppercase tracking-wider ${color.text} mb-2`;

        // --- Enhanced Content Logic ---
        // Target the container that holds description and metrics
        const contentContainer = document.querySelector('#case-modal .space-y-6');
        if (!contentContainer) {
            console.error('Modal content container not found');
            return;
        }
        contentContainer.innerHTML = ''; // Clear existing content

        // 1. Description
        const descEl = document.createElement('p');
        descEl.className = 'text-gray-300 leading-relaxed text-base';
        descEl.innerHTML = data.description;
        contentContainer.appendChild(descEl);

        // 2. Problem & Solution Blocks
        if (data.problem || data.solution) {
            const problemSolutionGrid = document.createElement('div');
            problemSolutionGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mt-6';

            if (data.problem) {
                problemSolutionGrid.innerHTML += `
                    <div class="bg-red-900/10 border border-red-500/20 rounded-lg p-4">
                        <div class="text-red-400 text-xs font-bold uppercase mb-2">Проблема</div>
                        <p class="text-gray-300 text-sm leading-relaxed">${data.problem}</p>
                    </div>`;
            }
            if (data.solution) {
                problemSolutionGrid.innerHTML += `
                    <div class="bg-green-900/10 border border-green-500/20 rounded-lg p-4">
                        <div class="text-green-400 text-xs font-bold uppercase mb-2">Решение</div>
                        <p class="text-gray-300 text-sm leading-relaxed">${data.solution}</p>
                    </div>`;
            }
            contentContainer.appendChild(problemSolutionGrid);
        }

        // 3. Stats Grid (Parsing JSON from data-stats)
        if (data.stats) {
            try {
                const stats = JSON.parse(data.stats);
                const statsContainer = document.createElement('div');
                statsContainer.className = 'grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-6';

                stats.forEach(stat => {
                    statsContainer.innerHTML += `
                        <div class="bg-[#151921] rounded-lg p-4 border border-white/5">
                            <div class="text-2xl font-bold text-white mb-1">${stat.value}</div>
                            <div class="text-xs text-gray-500 uppercase tracking-wide">${stat.label}</div>
                        </div>`;
                });
                contentContainer.appendChild(statsContainer);
            } catch (e) {
                console.error("Error parsing stats JSON", e);
            }
        } else if (data.metricValue) {
            // Fallback to single metric if no JSON stats
            const statsContainer = document.createElement('div');
            statsContainer.className = 'mt-6 pt-6 border-t border-white/10';
            statsContainer.innerHTML = `
                <div class="text-4xl font-bold text-white mb-1">${data.metricValue}</div>
                <div class="text-sm text-gray-500 uppercase tracking-wide">${data.metricLabel}</div>
             `;
            contentContainer.appendChild(statsContainer);
        }

        // 4. CTA
        const ctaDiv = document.createElement('div');
        ctaDiv.className = 'mt-8 pt-6 border-t border-white/10 flex justify-end';
        ctaDiv.innerHTML = `
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); document.getElementById('close-modal').click();">
              <span>Обсудить похожий проект</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        `;
        contentContainer.appendChild(ctaDiv);

        // Update Icons
        lucide.createIcons();

        // Show Modal
        modal.classList.remove('hidden');
        // Small delay for fade-in animation
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);

        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    // Event Listeners
    cards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-content')) {
            closeModal();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
