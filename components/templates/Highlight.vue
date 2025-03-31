<template>
    <div class="flex items-center justify-center w-full py-4">
        <NuxtImg :src="'/outside.png'" class="px-0 py-8 lg:px-32 lg:py-0"/>
        <Paragraph :title="'Central position'" title-size="4xl" :paragraph="'Perfect for a romantic getaway or a peaceful escape'" >
            <IconsGreen />
        </Paragraph>
    </div>
    <div class="flex items-center justify-center w-full py-4">
        <Paragraph :title="'Flexible Check-In Hours'" title-size="4xl" :paragraph="'Experience the ease of arriving at your preferred time'" >
            <IconsBlue />
        </Paragraph>
        <NuxtImg :src="'/checkin.png'" class="px-0 py-8 lg:px-32 lg:py-0"/>
    </div>
</template>
<script setup lang="ts">
</script>