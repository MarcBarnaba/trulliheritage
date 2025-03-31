<template> 
    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" :width="width" :height="height">
	<svg:style>
		.s0 { fill: #ffffff;stroke: #000000;stroke-miterlimit:10;stroke-width: 15;stroke-dasharray:  } 
		.s1 { fill: #92ad94;stroke: #000000;stroke-linecap: round;stroke-linejoin: round;stroke-width: 25;stroke-dasharray:  } 
		.s2 { fill: #ffffff;stroke: #000000;stroke-linejoin: round;stroke-width: 15;stroke-dasharray:  } 
		.s3 { fill: #929982;stroke: #000000;stroke-linecap: round;stroke-linejoin: round;stroke-width: 25;stroke-dasharray:  } 
		.s4 { fill: #000000;stroke: #000000;stroke-linecap: round;stroke-linejoin: round;stroke-width: 8;stroke-dasharray:  } 
	</svg:style>
	<g>
		<g id="Frame 1">
			<path class="s0" d="m301.3 96.3c0-11.1 9.2-20.1 20.5-20.1 11.4 0 20.6 9 20.6 20.1 0 11.1-9.2 20.1-20.6 20.1-11.3 0-20.5-9-20.5-20.1z"/>
			<path class="s1" d="m21.2 432l167.7-300 167.7 300z"/>
			<path class="s2" d="m322 173.2l-27.5-46.2h55z"/>
			<path class="s3" d="m167.4 432l154.6-260.9 154.6 260.9z"/>
			<path class="s2" d="m189.1 139.6l-27.7-46.2h55z"/>
			<path id="A copy 2" class="s2" d="m323 173l44 73.9h-88z"/>
			<path id="A copy 3" class="s2" d="m189 142l44 73.9h-88z"/>
			<path class="s0" d="m168.2 62.7c0-11.1 9.2-20.2 20.5-20.2 11.4 0 20.6 9.1 20.6 20.2 0 11.1-9.2 20.1-20.6 20.1-11.3 0-20.5-9-20.5-20.1z"/>
		</g>
		<g id="Cartella 1 copy">
			<path id="Forma 4 copy 3" fill-rule="evenodd" class="s4" d="m234.4 396.2h-33.3z"/>
			<path id="Forma 4 copy 5" fill-rule="evenodd" class="s4" d="m228.5 386.1h-27.4z"/>
			<path id="Forma 4 copy 4" fill-rule="evenodd" class="s4" d="m223.9 376.1h-22.8z"/>
		</g>
		<g id="Cartella 1 copy 3">
			<path id="Forma 4 copy 3" fill-rule="evenodd" class="s4" d="m106.4 362.2h-33.3z"/>
			<path id="Forma 4 copy 5" fill-rule="evenodd" class="s4" d="m100.5 352.1h-27.4z"/>
			<path id="Forma 4 copy 4" fill-rule="evenodd" class="s4" d="m95.9 342.1h-22.8z"/>
		</g>
		<g id="Cartella 1 copy 2">
			<path id="Forma 4 copy 3" fill-rule="evenodd" class="s4" d="m355.2 283.9l33.3 0.4z"/>
			<path id="Forma 4 copy 5" fill-rule="evenodd" class="s4" d="m361.1 294l27.3 0.3z"/>
			<path id="Forma 4 copy 4" fill-rule="evenodd" class="s4" d="m365.5 304.1l22.8 0.3z"/>
		</g>
		<g id="Cartella 1 copy 4">
			<path id="Forma 4 copy 3" fill-rule="evenodd" class="s4" d="m216.2 246.9l33.3 0.4z"/>
			<path id="Forma 4 copy 5" fill-rule="evenodd" class="s4" d="m222.1 257l27.3 0.3z"/>
			<path id="Forma 4 copy 4" fill-rule="evenodd" class="s4" d="m226.5 267.1l22.8 0.3z"/>
		</g>
	</g>
</svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
  }>(),
  {
    width: 100,
    height: 100
  }
);
</script>