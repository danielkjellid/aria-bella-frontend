<template>
  <div class="s-container box-border relative">
    <div class="group hover:bg-opacity-40 absolute top-0 bottom-0 left-0 z-10 w-16 h-full bg-black bg-opacity-50">
      <BaseButton @click="previous" plain class="group-hover:text-white flex items-center justify-center w-full h-full mx-auto text-gray-100">
        <BaseIcon name="chevron-left" solid fill="current-color" height="h-16" width="w-16" />
      </BaseButton>
    </div>
    <div class="group hover:bg-opacity-40 absolute top-0 bottom-0 right-0 z-10 w-16 h-full bg-black bg-opacity-50">
      <BaseButton @click="next" plain class="group-hover:text-white flex items-center justify-center w-full h-full mx-auto text-gray-100">
        <BaseIcon name="chevron-right" solid fill="current-color" height="h-16" width="w-16" />
      </BaseButton>
    </div>

    <!-- <section class="lg:px-3 relative mt-5">
      <div class="auto-cols-max relative grid grid-flow-col gap-2 overflow-x-auto">
        <div v-for="c in tempCat" :key="c" class="relative">
          <div class="w-72 table-cell h-48 align-middle rounded-md">
            <img :src="c.img" class="absolute bottom-0 left-0 right-0 object-cover w-full h-full rounded-md" />
            <div class="hover:bg-opacity-50 absolute inset-0 flex items-center justify-center h-full px-4 bg-black bg-opacity-25 rounded-md">
              <h2 class="text-2xl font-semibold text-white">{{c.title}}</h2>
            </div>
          </div>
        </div>
        <div class="absolute inset-0">
          <div class="absolute top-0 bottom-0 right-0 flex items-center">
            <BaseIcon class="test" name="chevron-right" solid fill="text-brand-600" height="h-8" width="w-8" />
          </div>
        </div>
      </div>
    </section> -->

    <div class="overflow-hidden">
      <transition-group class="slider" tag="div" name="list">
        <div
          class="slide-container"
          v-for="(container, slideContainerIndex) in slideContainer"
          :key="container"
          :class="[slideContainerIndex % 3 === 1 ? 'middle' : '']"
        >
          <div
            class="w-72 slide h-48 border border-indigo-600"
            v-for="(content, contentIndex) in contentContainer[container]"
            :key="contentIndex"
          >
            {{content}}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import _ from 'lodash'

export default defineComponent({
  name: 'Slider',
  props: {},
  setup(props) {
    let slideContainer = ref<number[]>([0, 1, 2]) // initial state of container, where 1 is in the middle
    let contentContainer = ref<number[][]>([]) // holds content in chunks
    let contentContainerSize = ref<number>(6) // default size per content chunk

    // TODO: add check to space out numbers that don't add up

    // sample data - to be replaced
    let contentData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

    // function that sets initial content state
    const setContentContainer = () => {
      if (process.browser) {
        // set chunk size based on viewport
        if (window.matchMedia('(max-width: 480px)').matches) {
          contentContainerSize.value = 2;
        } else if (window.matchMedia('(max-width: 768px)').matches) {
          contentContainerSize.value = 3;
        } else if (window.matchMedia('(max-width:1024px)').matches) {
          contentContainerSize.value = 4;
        } else {
          contentContainerSize.value = 6;
        }

        // split content into chunks
        contentContainer.value = _.chunk(contentData, contentContainerSize.value)

        // take last element and place first in array of chunks
        // this is because we want the last part to be ofset and the first part
        // to be in the middle initially
        contentContainer.value.unshift(contentContainer.value.pop() as number[])
      }
    }

    // reset container to initial state
    const updateContentContainer = () => {
      slideContainer.value = [0, 1, 2]
    }

    // reset content and container
    const resetContentContainer = () => {
      setContentContainer()
      updateContentContainer()
    }

    // previous slide
    const previous = () => {

      // check value to prevent negative container values
      if (slideContainer.value[0] >= 0) {

        // is we're at the first element (first chunk), place the last
        // container chunk index as the container element to create
        // infinite loop. Example:
        // [0, 1, 2] - if we're here, we want it to become [3, 0, 1] and not [-1, 0, 1]
        //  ^
        if (slideContainer.value[0] === 0) {
          const page = (contentContainer.value.length) - 1
          slideContainer.value.unshift(page)
        } else {
          // if we're not at the start, just continue to add container elements to
          // the start
          slideContainer.value.unshift(slideContainer.value[0] - 1)
        }

        // remove last constainer element
        slideContainer.value.pop()
      }
    }

    // next slide
    const next = () => {
      const lastElement = slideContainer.value[slideContainer.value.length - 1]

      // check value to prevent setting container element greater than
      // available chunks.
      if (lastElement < contentContainer.value.length) {

        // if we're at the last chunk, push the first container element. Example:
        // [0, 1, 2] - if we're here, we ant it to become [1, 2, 0], and not [1, 2, 3]
        //        ^
        if (lastElement === contentContainer.value.length - 1) {
          const page = (contentContainer.value.length - lastElement) - 1
          slideContainer.value.push(page)
        } else {
          // if we're not at the end, just continue to add container elements
          slideContainer.value.push(lastElement + 1)
        }

        // remove first container element
        slideContainer.value.shift()
      }
    }

    onMounted(() => {
      if (process.browser) {
        window.addEventListener('resize', () => resetContentContainer())
      }
    })

    onUnmounted(() => {
      if (process.browser) {
        window.removeEventListener('resize', () => resetContentContainer())
      }
    })

    setContentContainer()

    return {
      slideContainer,
      contentContainer,
      previous,
      next,
    }
  }
})
</script>

<style scoped>

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
