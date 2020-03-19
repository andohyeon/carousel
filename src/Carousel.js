import React, {Component} from 'react';

class Carousel extends Component {
   componentDidMount() {
       const slideList = document.querySelector('.slide_list');
       const slideContents = document.querySelectorAll('.slide_content');
       const slideBtnNext = document.querySelector('.slide_btn_next');
       const slideBtnPrev = document.querySelector('.slide_btn_prev');
       const pagination = document.querySelector('.slide_pagination');
       const slideLen = slideContents.length;
       const slideWidth = 400;
       const slideSpeed = 300;
       const startNum = 0;

       slideList.style.width = slideWidth * (slideLen + 2) + "px";

       // Copy first and last slide
       let firstChild = slideList.firstElementChild;
       let lastChild = slideList.lastElementChild;
       let clonedFirst = firstChild.cloneNode(true);
       let clonedLast = lastChild.cloneNode(true);

       // Add copied Slides
       slideList.appendChild(clonedFirst);
       slideList.insertBefore(clonedLast, slideList.firstElementChild);

       // Add pagination dynamically
       let pageChild = '';
       for (var i = 0; i < slideLen; i++) {
           pageChild += '<li class="dot';
           pageChild += (i === startNum) ? ' dot_active' : '';
           pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
       }
       pagination.innerHTML = pageChild;
       const pageDots = document.querySelectorAll('.dot'); // each dot from pagination

       slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

       let curIndex = startNum; // current slide index (except copied slide)
       let curSlide = slideContents[curIndex]; // current slide dom
       curSlide.classList.add('slide_active');

       /** Next Button Event */
       slideBtnNext.addEventListener('click', function() {
           if (curIndex <= slideLen - 1) {
               slideList.style.transition = slideSpeed + "ms";
               slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
           }
           if (curIndex === slideLen - 1) {
               setTimeout(function() {
                   slideList.style.transition = "0ms";
                   slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
               }, slideSpeed);
               curIndex = -1;
           }
           curSlide.classList.remove('slide_active');
           pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
           curSlide = slideContents[++curIndex];
           curSlide.classList.add('slide_active');
           pageDots[curIndex].classList.add('dot_active');
       });

       /** Prev Button Event */
       slideBtnPrev.addEventListener('click', function() {
           if (curIndex >= 0) {
               slideList.style.transition = slideSpeed + "ms";
               slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
           }
           if (curIndex === 0) {
               setTimeout(function() {
                   slideList.style.transition = "0ms";
                   slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
               }, slideSpeed);
               curIndex = slideLen;
           }
           curSlide.classList.remove('slide_active');
           pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active');
           curSlide = slideContents[--curIndex];
           curSlide.classList.add('slide_active');
           pageDots[curIndex].classList.add('dot_active');
       });

       /** Pagination Button Event */
       let curDot;
       Array.prototype.forEach.call(pageDots, function (dot, i) {
           dot.addEventListener('click', function (e) {
               e.preventDefault();
               curDot = document.querySelector('.dot_active');
               curDot.classList.remove('dot_active');

               curDot = this;
               this.classList.add('dot_active');

               curSlide.classList.remove('slide_active');
               curIndex = Number(this.getAttribute('data-index'));
               curSlide = slideContents[curIndex];
               curSlide.classList.add('slide_active');
               slideList.style.transition = slideSpeed + "ms";
               slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
           });
       });
    };

    render() {
        const { item } = this.props;

        return (
            <div id="slide_container">
                <div className="slide_wrap">
                    <div className="slide_box">
                        <div className="slide_list clearfix">
                            <div className="slide_content slide01">
                                <p>1</p>
                            </div>
                            <div className="slide_content slide02">
                                <p>2</p>
                            </div>
                            <div className="slide_content slide03">
                                <p>3</p>
                            </div>
                            <div className="slide_content slide04">
                                <p>4</p>
                            </div>
                            <div className="slide_content slide05">
                                <p>5</p>
                            </div>
                        </div>
                    </div>

                    <div className="slide_btn_box">
                        <button type="button" className="slide_btn_prev">Prev</button>
                        <button type="button" className="slide_btn_next">Next</button>
                    </div>

                    <ul className="slide_pagination" />
                </div>
            </div>
        );
    }
}

export default Carousel;