<template>
  <div>
    <Navbar />
    <Hero :title="'Ready to discover Alberobello?'" />
    <Paragraph
      :align="'center'"
      :title="'Discover AL 13'"
      title-size="4xl"
      :paragraph="'Nestled in the heart of Alberobello, AL 13 offers a charming and serene retreat for travelers looking to experience the beauty of this iconic town. This cozy vacation home provides a tranquil atmosphere while being steps away from the town\'s famous trulli. Immerse yourself in the history and culture of Alberobello while enjoying a memorable stay in this hidden gem!'"
    >
      <IconsMint />
    </Paragraph>
    <ImageGrid id="gallery" :images="images" />
    <Highlight />
    <iframe
      id="map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0707191003435!2d17.2366536!3d40.7824594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347b3baf5481343%3A0x13161602c736d938!2sAL%2013!5e0!3m2!1sit!2sit!4v1727632422216!5m2!1sit!2sit"
      width="100%"
      height="300"
      style="border: 0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <Contact id="faq" />
    <Foooter />
  </div>
</template>

<script setup lang="ts">

const images = [
  "/13/577082261.jpg",
  "/13/577082264.jpg",
  "/13/PHOTO-2024-05-07-13-40-52 8.jpg",
  "/13/PHOTO-2024-05-07-13-40-52.jpg",
];
</script>
