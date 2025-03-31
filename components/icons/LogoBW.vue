<template>
	<svg :width="width" :height="height" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink">
		<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none"
			stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
			font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
			<g id="Frame 1">

				<g stroke="#000000">
					<path
						d="M305.3032,105.2725c0,-11.1102 9.199,-20.1167 20.5464,-20.1167c11.3475,0 20.5464,9.0066 20.5464,20.1167c0,11.1102 -9.199,20.1167 -20.5464,20.1167c-11.3475,0 -20.5464,-9.0066 -20.5464,-20.1167z"
						fill="#ffffff" stroke-width="15" stroke-linecap="butt" stroke-linejoin="miter" />
					<polygon points="25.1899,440.9688 192.9095,140.9688 360.6291,440.9688" fill="#ffffff"
						stroke-width="25" stroke-linecap="round" stroke-linejoin="round" />
					<polygon points="326.0251,182.2092 298.5156,135.9965 353.5345,135.9965" fill="#fff7f7"
						stroke-width="15" stroke-linecap="butt" stroke-linejoin="round" />
					<polygon points="171.421,440.9688 326.0251,180.1395 480.6291,440.9688" fill="#ffffff"
						stroke-width="25" stroke-linecap="round" stroke-linejoin="round" />
					<polygon points="192.9095,148.603 165.4001,102.3903 220.4189,102.3903" fill="#fff7f7"
						stroke-width="15" stroke-linecap="butt" stroke-linejoin="round" />
					<path
						d="M172.1877,71.6663c0,-11.1102 9.1989,-20.1167 20.5464,-20.1167c11.3475,0 20.5464,9.0066 20.5464,20.1167c0,11.1102 -9.199,20.1167 -20.5464,20.1167c-11.3475,0 -20.5464,-9.0066 -20.5464,-20.1167z"
						fill="#ffffff" stroke-width="15" stroke-linecap="butt" stroke-linejoin="miter" />
					<line x1="140" y1="219" x2="241.4192" y2="219" fill="#ffffff" stroke-width="20"
						stroke-linecap="butt" stroke-linejoin="round" />
					<line x1="276.8076" y1="267.5474" x2="373.6034" y2="267.5474"
						data-paper-data="{&quot;rotation&quot;:1.3004288057897888}" fill="#ffffff" stroke-width="20"
						stroke-linecap="round" stroke-linejoin="round" />
				</g>
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