    // Mobile Menu Toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });

        // Scroll to Form Function
        function scrollToForm() {
            document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Highlight Toggle
        function toggleHighlight(element) {
            const details = element.querySelector('.highlight-details');
            details.classList.toggle('hidden');
        }

        // Floor Plan Carousel
        let currentPlan = 0;
        const totalPlans = 4;

        function updateCarousel() {
            const track = document.getElementById('carousel-track');
            track.style.transform = `translateX(-${currentPlan * 100}%)`;
            
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentPlan) {
                    indicator.classList.remove('bg-border');
                    indicator.classList.add('bg-accent');
                } else {
                    indicator.classList.remove('bg-accent');
                    indicator.classList.add('bg-border');
                }
            });
        }

        function nextPlan() {
            currentPlan = (currentPlan + 1) % totalPlans;
            updateCarousel();
        }

        function previousPlan() {
            currentPlan = (currentPlan - 1 + totalPlans) % totalPlans;
            updateCarousel();
        }

        function goToPlan(index) {
            currentPlan = index;
            updateCarousel();
        }

        // FAQ Toggle
        function toggleFAQ(element) {
            const answer = element.querySelector('.faq-answer');
            const icon = element.querySelector('.faq-icon');
            
            answer.classList.toggle('hidden');
            icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }

        // Multi-Step Form
        let currentStep = 1;

        function nextStep() {
            const currentStepElement = document.getElementById(`step-${currentStep}`);
            const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value) {
                    valid = false;
                    input.classList.add('border-error');
                } else {
                    input.classList.remove('border-error');
                }
            });

            if (valid && currentStep < 3) {
                currentStepElement.classList.add('hidden');
                currentStep++;
                document.getElementById(`step-${currentStep}`).classList.remove('hidden');
                updateStepIndicators();
            }
        }

        function previousStep() {
            if (currentStep > 1) {
                document.getElementById(`step-${currentStep}`).classList.add('hidden');
                currentStep--;
                document.getElementById(`step-${currentStep}`).classList.remove('hidden');
                updateStepIndicators();
            }
        }

        function updateStepIndicators() {
            const indicators = document.querySelectorAll('.step-indicator');
            indicators.forEach((indicator, index) => {
                const circle = indicator.querySelector('div');
                if (index + 1 <= currentStep) {
                    indicator.classList.add('active');
                    circle.classList.remove('bg-border', 'text-text-secondary');
                    circle.classList.add('bg-accent', 'text-white');
                } else {
                    indicator.classList.remove('active');
                    circle.classList.remove('bg-accent', 'text-white');
                    circle.classList.add('bg-border', 'text-text-secondary');
                }
            });
        }

        // Form Submit Handler
        function handleFormSubmit(event) {
            event.preventDefault();
            
            // Show success message
            alert('Thank you for booking! We will contact you shortly to confirm your site visit.');
            
            // Reset form
            document.getElementById('lead-capture-form').reset();
            document.getElementById('step-3').classList.add('hidden');
            currentStep = 1;
            document.getElementById('step-1').classList.remove('hidden');
            updateStepIndicators();
        }

        // Countdown Timer
        function updateCountdown() {
            const deadline = new Date('2025-12-10T23:59:59').getTime();
            const now = new Date().getTime();
            const distance = deadline - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Virtual Tour Functions
        function openVirtualTour(type) {
            document.getElementById('virtual-tour-modal').classList.remove('hidden');
        }

        function closeVirtualTour() {
            document.getElementById('virtual-tour-modal').classList.add('hidden');
        }

        function openVideoTestimonials() {
            alert('Video testimonials will open in a modal or new page');
        }

        function downloadBrochure() {
            alert('Brochure download will be initiated. Please provide your email for the download link.');
        }

        // Booking Notification Animation
        const notifications = [
            { name: 'Rajesh K.', unit: '3BHK', time: '2 minutes ago' },
            { name: 'Priya S.', unit: '2BHK', time: '5 minutes ago' },
            { name: 'Amit P.', unit: '4BHK', time: '8 minutes ago' },
            { name: 'Sneha M.', unit: '3BHK', time: '12 minutes ago' }
        ];

        let notificationIndex = 0;

        function updateBookingNotification() {
            const notification = notifications[notificationIndex];
            const element = document.getElementById('booking-notification');
            element.innerHTML = `
                <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span class="text-sm font-medium">${notification.name} just booked a ${notification.unit} unit • ${notification.time}</span>
            `;
            notificationIndex = (notificationIndex + 1) % notifications.length;
        }

        setInterval(updateBookingNotification, 8000);

        // Sticky CTA Show/Hide on Scroll
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const stickyCTA = document.getElementById('sticky-cta');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 500) {
                stickyCTA.classList.remove('hidden');
            } else {
                stickyCTA.classList.add('hidden');
            }
            
            lastScroll = currentScroll;
        });

        // Set minimum date for visit date input
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('visit-date').setAttribute('min', today);
 
