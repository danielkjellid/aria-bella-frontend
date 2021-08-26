<template>
  <div class="s-container box-border relative">
    <div v-show="infinityLoop" class="absolute top-0 bottom-0 left-0 z-10 w-16 h-full bg-black bg-opacity-50">
      <div class="flex items-center justify-center">
        <button class="text-white" @click="left">p</button>
      </div>
    </div>
    <div class="absolute top-0 bottom-0 right-0 z-10 w-16 h-full bg-black bg-opacity-50">
      <div class="flex items-center justify-center">
        <button class="text-white" @click="right">n</button>
      </div>
    </div>

    <div class="overflow-hidden">
      <transition-group class="slider" tag="div" name="list">
        <div class="slide-container" v-for="(container,slideContainerIndex) in slideContainer" :key="container" :class="[slideContainerIndex%3 === 1 ? 'middle' : '']" v-on:transitionend="containerTransition">
          <div
            class="slide"
            v-for="(content ,contentIndex) in contentContainer[container]"
            :key="contentIndex"
            :id="'slide-'+container+'-'+contentIndex"
            :data-container-index="slideContainerIndex"
            :data-content-index="contentIndex"
          >
              {{content}}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>

import { defineComponent, useFetch, ref, useContext } from '@nuxtjs/composition-api'
import _ from 'lodash'

export default {
  name: 'Slider',
  data() {
    return {
      bodyMarginLeft: process.browser ? document.body.getBoundingClientRect().left : null,
      timeoutID: '',
      ratio: 1.6,
      isSliding: false,
      slideContainer: [-1, 0, 1],
      contentContainer: [],
      contentContainerSize: 6,
      contentData:
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      infinityLoop: false,
    };
  },
  methods: {
    left: _.debounce(function slideLeft() {
      this.isSliding = true;
      // Infinity loop
      if (this.slideContainer[0] === 0) {
        const page = this.contentContainer.length - 1;
        this.slideContainer.unshift(page);
      } else {
        this.slideContainer.unshift(this.slideContainer[0] - 1);
      }
      this.slideContainer.pop();
      this.setColor(this.slideContainer[0]);
    }, 200),
    right: _.debounce(function slideRight() {
      if (_.last(this.slideContainer) < this.contentContainer.length) {
        this.isSliding = true;
        this.infinityLoop = true;
        // Infinity loop
        if (_.last(this.slideContainer) === this.contentContainer.length - 1) {
          const page = (this.contentContainer.length - _.last(this.slideContainer)) - 1;
          this.slideContainer.push(page);
        } else {
          this.slideContainer.push(_.last(this.slideContainer) + 1);
        }
        this.slideContainer.shift();
        this.setColor(_.last(this.slideContainer));
      }
    }, 200),
    containerIndex(element) {
      return element.dataset.containerIndex * 1;
    },
    contentIndex(element) {
      return element.dataset.contentIndex * 1;
    },
    slideIsFirstOrLast(element) {
      return {
        isFirst: this.slideIsFirst(element),
        isLast: this.slideIsLast(element),
      };
    },
    slideIsFirst(element) {
      return this.contentIndex(element) === 0;
    },
    slideIsLast(element) {
      const containerIndex = this.containerIndex(element);
      return this.contentIndex(element) === this.contentContainer[containerIndex].length - 1;
    },
    animateSlideTransition(callback) {
      this.$refs.slides.forEach((slide) => {
        callback(slide);
      });
    },
    containerTransition() {
      // Triggered by 'transitionend' event from slider container
      this.isSliding = false;
    },
    resetContentContainer() {
      this.setContentContainer();
      this.updateContentContainer();
    },
    setContentContainer() {
      if (process.browser) {
        if (window.matchMedia('(max-width: 480px)').matches) {
          this.contentContainerSize = 2;
        } else if (window.matchMedia('(max-width: 768px)').matches) {
          this.contentContainerSize = 3;
        } else if (window.matchMedia('(max-width:1024px)').matches) {
          this.contentContainerSize = 4;
        } else {
          this.contentContainerSize = 6;
        }
        this.contentContainer = _.chunk(this.contentData, this.contentContainerSize);
      }
    },
    updateContentContainer() {
      this.slideContainer = [-1, 0, 1];
      this.setColor(this.slideContainer[0]);
      this.setColor(this.slideContainer[1]);
      this.setColor(this.slideContainer[2]);
    },
    setColor(containerIndex, callback) {
      // Helper function for the demo
      if (containerIndex > -1 && containerIndex < this.contentContainer.length) {
        this.$nextTick(() => {
          this.contentContainer[containerIndex].forEach((content, contentIndex) => {
            const slideID = `#slide-${containerIndex}-${contentIndex}`;
            const slide = this.$el.querySelector(slideID);
            const offset = contentIndex * 7;
            const hue = (containerIndex * 20) % 360;
            this.setStyleProperty(slide, { 'background-color': `hsl(${hue},${40 + offset}%,${50 + offset}%)` });
          });
          if (callback) {
            callback();
          }
        });
      }
    },
    setStyleProperty(element, styles) {
      Object.assign(element.style, styles);
    },
  },
  mounted() {
    this.$el.style.setProperty('--ratio', `${this.ratio}`);
    this.slideContainer.forEach((container) => {
      this.setColor(container);
    });

    if (process.browser) {
      window.addEventListener('resize', _.debounce(this.resetContentContainer, 150));
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', _.debounce(this.resetContentContainer, 150));
    }
  },
  created() {
    this.setContentContainer();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Medium Devices, Desktops */
/* Small Devices, Tablets */
/* Extra small devices */
 .s-container {
	 --duration: 0.4s;
	 --cubic-bezier: cubic-bezier(0.5, 0, 0.1, 1);
	 position: relative;
}

 .slider {
	 display: flex;
	 width: 270vw;
	 transform: translateX(-85vw);
}
 .slide-container {
	 display: flex;
	 flex: 0 0 90vw;
	 will-change: transform;
}
 .slide-container.middle {
	 z-index: 1;
}
 .slide {
	 width: 15vw;
	 height: 9vw;
	 transition: transform var(--duration) var(--cubic-bezier);
	 will-change: transform;
}
/* Slider Transition*/
 .list-enter, .list-leave-to {
	 opacity: 0;
}
 .list-leave-active {
	 display: none;
	 position: absolute;
}
 .list-move {
	 transition: all 1s;
}
/* Responsilbe Web */
 @media only screen and (max-width: 1024px) {
	 .slide {
		 width: 22.5vw;
		 height: 13.5vw;
	}
	 .slide-button {
		 height: 13.5vw;
	}
}
 @media only screen and (max-width: 768px) {
	 .slide {
		 width: 30vw;
		 height: 18vw;
	}
	 .slide-button {
		 height: 18vw;
	}
}
 @media only screen and (max-width: 480px) {
	 .slide {
		 width: 45vw;
		 height: 27vw;
	}
	 .slide-button {
		 height: 27vw;
	}
}
</style>
