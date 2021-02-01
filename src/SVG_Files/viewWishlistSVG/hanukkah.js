import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent(props) {
  return ({
    color: '#EF795A',
    svg:(
    <Svg
      width={1400}
      height={1400}
      viewBox="0 0 1400 1400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M1400 0H0v1400h1400V0z" fill="#EF795A" />
      <Path
        d="M995.802 534l342.698 1.1s-6.3-30.6-30.6-32.7c-24.3-2.1-20-34.8-51.7-64.3-31.6-29.5-79.1 16.9-90.7 40.1-11.6 23.2-23.2-7.4-56.9 2.1s-36.4 27.5-64.3 27.4c-28-.1-54.898 15.8-48.498 26.3z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M54.3 345.8h344s-7.3-26.2-41.3-26.2-55-1.9-84-17.5-57-33.8-90-23.1c-33 10.7-29 33.8-57 34.4-28 .6-51 8.8-55 15.6-4 6.9-23.5 3.7-16.7 16.8z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M933.3 1353c223.45 0 404.6-39.85 404.6-89s-181.15-89-404.6-89c-223.454 0-404.6 39.85-404.6 89s181.146 89 404.6 89z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M700.085 958.022H1400s-2.9-55.019-122.9-82.358c-120-27.339-181.83-45.991-220.5-113.274-38.67-67.283-138.398-141.38-211.217-111.997-72.819 29.384-104.076 16.608-145.298 25.551v282.078z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        d="M699.915 958.022H0s2.896-55.019 122.898-82.358C242.901 848.325 304.733 829.673 343.4 762.39c38.666-67.283 138.398-141.38 211.218-111.997 72.819 29.384 104.075 16.608 145.297 25.551v282.078z"
        fill="url(#prefix__paint4_linear)"
      />
      <Path
        d="M704.9 1345.2c109.739 0 198.7-46.43 198.7-103.7s-88.961-103.7-198.7-103.7c-109.739 0-198.7 46.43-198.7 103.7s88.961 103.7 198.7 103.7z"
        fill="url(#prefix__paint5_linear)"
      />
      <Path
        d="M735.1 1141c-2.3-7.6-9.3-11.5-9.3-11.5l-21 5.7-21-5.7s-7 3.9-9.3 11.5c0 0 2.3 23.3 30.2 23.3 28.2 0 30.4-23.3 30.4-23.3z"
        fill="url(#prefix__paint6_linear)"
      />
      <Path
        d="M631.1 398.9c-.9-15.3-4.5-24.1-4.5-24.1s-7.6-3.6-25.2-3.6-25.2 3.6-25.2 3.6-3.6 8.7-4.5 24.1c-.9 15.4 7.2 27.7 7.2 27.7 8.3-6.7 22.5-6.2 22.5-6.2s14.2-.5 22.5 6.2c.1 0 8.1-12.3 7.2-27.7z"
        fill="url(#prefix__paint7_linear)"
      />
      <Path
        d="M627 363.7c-6.4-4.4-25.6-4.3-25.6-4.3s-19.2-.1-25.6 4.3c-6.4 4.4-3.9 8.7.4 11.2l25.2-3.6 25.2 3.6c4.4-2.5 6.9-6.8.4-11.2z"
        fill="url(#prefix__paint8_linear)"
      />
      <Path
        d="M601.5 420.4c-16.3-.2-22.5 6.2-22.5 6.2s.8 5.8 1.3 8.8c.6 3 10.5 4.8 10.5 4.8l10.7-7.1 10.7 7.1s9.9-1.8 10.5-4.8c.6-3 1.3-8.8 1.3-8.8s-6.3-6.3-22.5-6.2z"
        fill="url(#prefix__paint9_linear)"
      />
      <Path
        d="M601.5 440.8c11.708 0 21.2-2.418 21.2-5.4s-9.492-5.4-21.2-5.4c-11.708 0-21.2 2.418-21.2 5.4s9.492 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M528.6 395.8c-.9-15.3-4.5-24.1-4.5-24.1s-7.6-3.6-25.2-3.6-25.2 3.6-25.2 3.6-3.6 8.7-4.5 24.1c-.9 15.4 7.2 27.7 7.2 27.7 8.3-6.7 22.5-6.2 22.5-6.2s14.2-.5 22.5 6.2c0 0 8.1-12.3 7.2-27.7z"
        fill="url(#prefix__paint10_linear)"
      />
      <Path
        d="M524.5 360.6c-6.4-4.4-25.6-4.3-25.6-4.3s-19.2-.1-25.6 4.3c-6.4 4.4-3.9 8.7.4 11.2l25.2-3.6 25.2 3.6c4.3-2.5 6.8-6.8.4-11.2z"
        fill="url(#prefix__paint11_linear)"
      />
      <Path
        d="M498.9 417.3c-16.3-.2-22.5 6.2-22.5 6.2s.8 5.8 1.3 8.8c.6 3 10.5 4.8 10.5 4.8l10.7-7.1 10.7 7.1s9.9-1.8 10.5-4.8c.6-3 1.3-8.8 1.3-8.8s-6.2-6.3-22.5-6.2z"
        fill="url(#prefix__paint12_linear)"
      />
      <Path
        d="M498.9 437.7c11.708 0 21.2-2.418 21.2-5.4s-9.492-5.4-21.2-5.4c-11.709 0-21.2 2.418-21.2 5.4s9.491 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M431.9 401c-.9-15.3-4.5-24.1-4.5-24.1s-7.6-3.6-25.2-3.6-25.2 3.6-25.2 3.6-3.6 8.7-4.5 24.1c-.9 15.4 7.2 27.7 7.2 27.7 8.3-6.7 22.5-6.2 22.5-6.2s14.2-.5 22.5 6.2c.1-.1 8.2-12.4 7.2-27.7z"
        fill="url(#prefix__paint13_linear)"
      />
      <Path
        d="M427.9 365.7c-6.4-4.4-25.6-4.3-25.6-4.3s-19.2-.1-25.6 4.3c-6.4 4.4-3.9 8.7.4 11.2l25.2-3.6 25.2 3.6c4.3-2.5 6.8-6.8.4-11.2z"
        fill="url(#prefix__paint14_linear)"
      />
      <Path
        d="M402.3 422.5c-16.3-.2-22.5 6.2-22.5 6.2s.8 5.8 1.3 8.8c.6 3 10.5 4.8 10.5 4.8l10.7-7.1 10.7 7.1s9.9-1.8 10.5-4.8c.6-3 1.3-8.8 1.3-8.8s-6.3-6.4-22.5-6.2z"
        fill="url(#prefix__paint15_linear)"
      />
      <Path
        d="M402.3 442.8c11.709 0 21.2-2.418 21.2-5.4s-9.491-5.4-21.2-5.4c-11.708 0-21.2 2.418-21.2 5.4s9.492 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M704.9 419.3c-16.3-.2-22.5 6.2-22.5 6.2s.8 5.8 1.3 8.8c.6 3 10.5 4.8 10.5 4.8l10.7-7.1 10.7 7.1s9.9-1.8 10.5-4.8c.6-3 1.3-8.8 1.3-8.8s-6.3-6.4-22.5-6.2z"
        fill="url(#prefix__paint16_linear)"
      />
      <Path
        d="M704.9 439.6c11.708 0 21.2-2.418 21.2-5.4s-9.492-5.4-21.2-5.4c-11.708 0-21.2 2.418-21.2 5.4s9.492 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M737 344.2c-1-15.3-4.9-24.1-4.9-24.1s-8.3-3.6-27.3-3.6-27.3 3.6-27.3 3.6-3.9 8.7-4.9 24.1c-1 15.4 7.8 27.7 7.8 27.7 9-6.7 24.4-6.2 24.4-6.2s15.3-.5 24.4 6.2c0 0 8.8-12.3 7.8-27.7z"
        fill="url(#prefix__paint17_linear)"
      />
      <Path
        d="M732.6 308.9c-7-4.4-27.7-4.3-27.7-4.3s-20.8-.1-27.7 4.3c-7 4.4-4.3 8.7.4 11.2l27.3-3.6 27.3 3.6c4.7-2.5 7.3-6.7.4-11.2z"
        fill="url(#prefix__paint18_linear)"
      />
      <Path
        d="M616 437.5v-.3h-.1c-.8-1.5-7.2-2.7-14.9-2.7s-14.1 1.2-14.9 2.7h-.1v.3c0 65.6 53.4 118.9 118.9 118.9v-30c-49.1 0-88.9-39.9-88.9-88.9z"
        fill="url(#prefix__paint19_linear)"
      />
      <Path
        d="M513.2 435.5v-.7c0-1.7-6.7-3-15-3s-15 1.4-15 3v.7c0 59.2 23.1 114.9 64.9 156.8 41.9 41.9 97.5 64.9 156.8 64.9v-30c-105.7 0-191.7-86-191.7-191.7z"
        fill="url(#prefix__paint20_linear)"
      />
      <Path
        d="M417.5 440.6v-.8c0-1.7-6.7-3-15-3s-15 1.4-15 3v.8c0 84.8 33 164.5 92.9 224.4 59.9 59.9 139.6 92.9 224.4 92.9v-30c-158.4.1-287.3-128.8-287.3-287.3z"
        fill="url(#prefix__paint21_linear)"
      />
      <Path
        d="M793.7 362.8c6.4-4.4 25.6-4.3 25.6-4.3s19.2-.1 25.6 4.3c6.4 4.4 3.9 8.7-.4 11.2l-25.2-3.6-25.2 3.6c-4.3-2.5-6.8-6.8-.4-11.2z"
        fill="url(#prefix__paint22_linear)"
      />
      <Path
        d="M819.3 419.6c16.3-.2 22.5 6.2 22.5 6.2s-.8 5.8-1.3 8.8c-.6 3-10.5 4.8-10.5 4.8l-10.7-7.1-10.7 7.1s-9.9-1.8-10.5-4.8c-.6-3-1.3-8.8-1.3-8.8s6.2-6.4 22.5-6.2z"
        fill="url(#prefix__paint23_linear)"
      />
      <Path
        d="M819.3 439.9c11.708 0 21.2-2.418 21.2-5.4s-9.492-5.4-21.2-5.4c-11.709 0-21.2 2.418-21.2 5.4s9.491 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M896.2 359.7c6.4-4.4 25.6-4.3 25.6-4.3s19.2-.1 25.6 4.3c6.4 4.4 3.9 8.7-.4 11.2l-25.2-3.6-25.2 3.6c-4.3-2.5-6.8-6.8-.4-11.2z"
        fill="url(#prefix__paint24_linear)"
      />
      <Path
        d="M921.8 416.5c16.3-.2 22.5 6.2 22.5 6.2s-.8 5.8-1.3 8.8c-.6 3-10.5 4.8-10.5 4.8l-10.7-7.1-10.7 7.1s-9.9-1.8-10.5-4.8c-.6-3-1.3-8.8-1.3-8.8s6.3-6.4 22.5-6.2z"
        fill="url(#prefix__paint25_linear)"
      />
      <Path
        d="M921.8 436.8c11.709 0 21.2-2.418 21.2-5.4s-9.491-5.4-21.2-5.4c-11.708 0-21.2 2.418-21.2 5.4s9.492 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M992.9 364.8c6.4-4.4 25.6-4.3 25.6-4.3s19.2-.1 25.6 4.3c6.4 4.4 3.9 8.7-.4 11.2l-25.2-3.6-25.2 3.6c-4.4-2.5-6.8-6.7-.4-11.2z"
        fill="url(#prefix__paint26_linear)"
      />
      <Path
        d="M1018.5 421.6c16.3-.2 22.5 6.2 22.5 6.2s-.8 5.8-1.3 8.8c-.6 3-10.5 4.8-10.5 4.8l-10.7-7.1-10.7 7.1s-9.9-1.8-10.5-4.8c-.6-3-1.3-8.8-1.3-8.8s6.2-6.4 22.5-6.2z"
        fill="url(#prefix__paint27_linear)"
      />
      <Path
        d="M1018.5 441.9c11.71 0 21.2-2.418 21.2-5.4s-9.49-5.4-21.2-5.4c-11.71 0-21.2 2.418-21.2 5.4s9.49 5.4 21.2 5.4z"
        fill="#F0B78C"
      />
      <Path
        d="M804.8 437.5v-.3h.1c.8-1.5 7.2-2.7 14.9-2.7s14.1 1.2 14.9 2.7h.1v.3c0 65.6-53.4 118.9-118.9 118.9v-30c49 0 88.9-39.9 88.9-88.9z"
        fill="url(#prefix__paint28_linear)"
      />
      <Path
        d="M907.6 435.5v-.7c0-1.7 6.7-3 15-3s15 1.4 15 3v.7c0 59.2-23.1 114.9-64.9 156.8-41.9 41.9-97.5 64.9-156.8 64.9v-30c105.7 0 191.7-86 191.7-191.7z"
        fill="url(#prefix__paint29_linear)"
      />
      <Path
        d="M1003.2 439.8v-.8c0-1.7 6.7-3 15-3s15 1.4 15 3v.8c0 84.8-33 164.5-92.9 224.4-59.9 59.9-139.6 92.9-224.4 92.9v-30c158.4 0 287.3-128.9 287.3-287.3z"
        fill="url(#prefix__paint30_linear)"
      />
      <Path
        d="M725.9 1129.5l-5-137.7-16 8.7-16-8.7-5 137.7c0 3.2 9.4 5.8 21 5.8s21-2.7 21-5.8z"
        fill="url(#prefix__paint31_linear)"
      />
      <Path
        d="M719.9 435.8s0-.1 0 0c0-1.8-6.7-3.1-15-3.1s-15 1.4-15 3v331.8h30V435.8z"
        fill="url(#prefix__paint32_linear)"
      />
      <Path
        d="M811.2 958.6H598.5c-3.8 0-7.3-2-9.2-5.3-1.9-3.3-1.9-7.3-.1-10.6l106.3-187c1.9-3.3 5.4-5.4 9.3-5.4 3.8 0 7.4 2.1 9.3 5.4l106.4 187c1.9 3.3 1.8 7.4-.1 10.6-1.9 3.3-5.4 5.3-9.2 5.3zm-196.6-20h180.6l-90.3-158.7-90.3 158.7z"
        fill="url(#prefix__paint33_linear)"
      />
      <Path
        d="M704.9 1013.9c-3.8 0-7.4-2.1-9.3-5.4l-106.4-187c-1.9-3.3-1.8-7.4.1-10.6 1.9-3.2 5.4-5.3 9.2-5.3h212.7c3.8 0 7.3 2 9.2 5.3 1.9 3.3 1.9 7.3.1 10.6l-106.3 187c-1.9 3.3-5.5 5.4-9.3 5.4zm-90.3-188.3l90.3 158.7 90.3-158.7H614.6z"
        fill="url(#prefix__paint34_linear)"
      />
      <Path
        d="M730.5 362.5c-6.4-4.4-25.6-4.3-25.6-4.3s-19.2-.1-25.6 4.3c-6.4 4.4-3.9 8.7.4 11.2l25.2-3.6 25.2 3.6c4.3-2.5 6.8-6.8.4-11.2z"
        fill="url(#prefix__paint35_linear)"
      />
      <Path
        d="M734.5 397.8c-.9-15.3-4.5-24.1-4.5-24.1s-7.6-3.6-25.2-3.6-25.2 3.6-25.2 3.6-3.6 8.7-4.5 24.1c-.9 15.4 7.2 27.7 7.2 27.7 8.3-6.7 22.5-6.2 22.5-6.2s14.2-.5 22.5 6.2c.1-.1 8.2-12.3 7.2-27.7z"
        fill="url(#prefix__paint36_linear)"
      />
      <Path
        d="M789.6 398.1c.9-15.3 4.5-24.1 4.5-24.1s7.6-3.6 25.2-3.6 25.2 3.6 25.2 3.6 3.6 8.7 4.5 24.1c.9 15.4-7.2 27.7-7.2 27.7-8.3-6.7-22.5-6.2-22.5-6.2s-14.2-.5-22.5 6.2c0-.1-8.1-12.3-7.2-27.7z"
        fill="url(#prefix__paint37_linear)"
      />
      <Path
        d="M892.2 395c.9-15.3 4.5-24.1 4.5-24.1s7.6-3.6 25.2-3.6 25.2 3.6 25.2 3.6 3.6 8.7 4.5 24.1c.9 15.4-7.2 27.7-7.2 27.7-8.3-6.7-22.5-6.2-22.5-6.2s-14.2-.5-22.5 6.2c-.1-.1-8.2-12.3-7.2-27.7z"
        fill="url(#prefix__paint38_linear)"
      />
      <Path
        d="M988.8 400.1c.9-15.3 4.5-24.1 4.5-24.1s7.6-3.6 25.2-3.6 25.2 3.6 25.2 3.6 3.6 8.7 4.5 24.1c.9 15.4-7.2 27.7-7.2 27.7-8.3-6.7-22.5-6.2-22.5-6.2s-14.2-.5-22.5 6.2c0 0-8.1-12.3-7.2-27.7z"
        fill="url(#prefix__paint39_linear)"
      />
      <Path
        d="M325.861 226.153v-42.452h-58.224v42.452h-5.692v-84.785h5.692v37.234h58.224v-37.234h5.692v84.785h-5.692zm41.454-29.408l-12.214 29.408h-6.048l35.693-85.378h3.321l35.811 85.378h-6.403l-12.214-29.408h-37.946zm18.736-46.484c-.079.079-.237.554-.475 1.423-1.106 3.4-2.174 6.285-3.201 8.657l-13.044 31.542h33.914l-13.044-31.424c-2.767-6.008-4.15-9.407-4.15-10.198zm60.842 4.625l.237 10.079v61.188h-5.692v-85.497h2.609l55.852 64.39c3.794 4.506 6.719 8.103 8.775 10.791-.316-3.795-.475-8.143-.475-13.044v-61.425h5.692v85.497h-2.608l-56.919-65.576c-3.953-4.506-6.483-7.51-7.59-9.012l.119 2.609zm155.46 63.085c-5.455 6.403-13.756 9.605-24.902 9.605-11.147 0-19.487-3.241-25.021-9.723-5.455-6.483-8.182-15.337-8.182-26.563v-49.922h5.692v49.922c0 20.871 9.131 31.306 27.392 31.306 18.341 0 27.511-10.435 27.511-31.306v-49.922h5.692v49.922c0 11.305-2.727 20.199-8.182 26.681zm89.486-76.603l-36.049 41.029c4.823 5.771 10.356 12.214 16.602 19.328 6.324 7.115 10.395 11.503 12.214 13.163a378.625 378.625 0 004.387 3.795c1.107.79 2.767 1.699 4.98 2.727 2.214.949 4.586 1.581 7.115 1.897l-.118 3.795c-4.744-.079-8.657-.791-11.74-2.135-3.083-1.423-5.771-3.241-8.063-5.454-2.293-2.293-7.313-7.827-15.06-16.602-7.668-8.854-13.439-15.613-17.313-20.277l36.404-41.266h6.641zm-45.298 0v84.785h-5.692v-84.785h5.692zm118.832 0l-36.048 41.029c4.822 5.771 10.356 12.214 16.601 19.328 6.324 7.115 10.395 11.503 12.214 13.163a387.37 387.37 0 004.387 3.795c1.107.79 2.767 1.699 4.981 2.727 2.213.949 4.585 1.581 7.115 1.897l-.119 3.795c-4.743-.079-8.657-.791-11.74-2.135-3.083-1.423-5.771-3.241-8.063-5.454-2.293-2.293-7.313-7.827-15.06-16.602-7.668-8.854-13.439-15.613-17.313-20.277l36.405-41.266h6.64zm-45.298 0v84.785h-5.692v-84.785h5.692zm72.349 55.377l-12.214 29.408h-6.048l35.693-85.378h3.32l35.812 85.378h-6.404l-12.213-29.408h-37.946zm18.735-46.484c-.079.079-.237.554-.474 1.423-1.107 3.4-2.174 6.285-3.202 8.657l-13.044 31.542h33.915l-13.044-31.424c-2.767-6.008-4.151-9.407-4.151-10.198zm119.303 75.892v-42.452h-58.223v42.452h-5.692v-84.785h5.692v37.234h58.223v-37.234h5.692v84.785h-5.692z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={1165.35}
          y1={525.591}
          x2={1145.92}
          y2={412.415}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={225.398}
          y1={342.798}
          x2={209.191}
          y2={248.415}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={528.696}
          y1={1264}
          x2={1337.88}
          y2={1264}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#CC452D" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={1058.58}
          y1={747.964}
          x2={984.479}
          y2={1348.46}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#E62125" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={341.417}
          y1={747.964}
          x2={415.521}
          y2={1348.46}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#E62125" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={700.294}
          y1={1221.02}
          x2={754.294}
          y2={1462.02}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint6_linear"
          x1={701.598}
          y1={1124.91}
          x2={718.098}
          y2={1206.41}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint7_linear"
          x1={571.718}
          y1={398.932}
          x2={631.197}
          y2={398.932}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint8_linear"
          x1={571.969}
          y1={367.126}
          x2={630.946}
          y2={367.126}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint9_linear"
          x1={578.958}
          y1={430.305}
          x2={623.958}
          y2={430.305}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint10_linear"
          x1={469.179}
          y1={395.836}
          x2={528.658}
          y2={395.836}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint11_linear"
          x1={469.43}
          y1={364.03}
          x2={528.408}
          y2={364.03}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint12_linear"
          x1={476.419}
          y1={427.21}
          x2={521.419}
          y2={427.21}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint13_linear"
          x1={372.543}
          y1={400.952}
          x2={432.023}
          y2={400.952}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint14_linear"
          x1={372.794}
          y1={369.146}
          x2={431.772}
          y2={369.146}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint15_linear"
          x1={379.783}
          y1={432.326}
          x2={424.783}
          y2={432.326}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint16_linear"
          x1={682.374}
          y1={429.155}
          x2={727.374}
          y2={429.155}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint17_linear"
          x1={672.661}
          y1={344.197}
          x2={737.088}
          y2={344.197}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint18_linear"
          x1={672.933}
          y1={312.391}
          x2={736.816}
          y2={312.391}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint19_linear"
          x1={585.957}
          y1={495.455}
          x2={704.875}
          y2={495.455}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#224762" />
          <Stop offset={1} stopColor="#0F2335" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint20_linear"
          x1={483.176}
          y1={544.511}
          x2={704.874}
          y2={544.511}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#224762" />
          <Stop offset={1} stopColor="#0F2335" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint21_linear"
          x1={387.541}
          y1={597.362}
          x2={704.874}
          y2={597.362}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#224762" />
          <Stop offset={1} stopColor="#0F2335" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint22_linear"
          x1={789.803}
          y1={366.265}
          x2={848.78}
          y2={366.265}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint23_linear"
          x1={796.791}
          y1={429.444}
          x2={841.791}
          y2={429.444}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint24_linear"
          x1={892.341}
          y1={363.169}
          x2={951.319}
          y2={363.169}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint25_linear"
          x1={899.33}
          y1={426.349}
          x2={944.33}
          y2={426.349}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint26_linear"
          x1={988.977}
          y1={368.285}
          x2={1047.95}
          y2={368.285}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint27_linear"
          x1={995.966}
          y1={431.464}
          x2={1040.97}
          y2={431.464}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint28_linear"
          x1={715.874}
          y1={495.455}
          x2={834.792}
          y2={495.455}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0F2335" />
          <Stop offset={1} stopColor="#224762" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint29_linear"
          x1={715.874}
          y1={544.511}
          x2={937.573}
          y2={544.511}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0F2335" />
          <Stop offset={1} stopColor="#224762" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint30_linear"
          x1={715.875}
          y1={596.501}
          x2={1033.21}
          y2={596.501}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0F2335" />
          <Stop offset={1} stopColor="#224762" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint31_linear"
          x1={709.131}
          y1={1074.13}
          x2={758.631}
          y2={1171.63}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint32_linear"
          x1={701.14}
          y1={794.262}
          x2={704.473}
          y2={622.262}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0F2335" />
          <Stop offset={1} stopColor="#224762" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint33_linear"
          x1={587.877}
          y1={854.457}
          x2={821.872}
          y2={854.457}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0F2335" />
          <Stop offset={1} stopColor="#224762" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint34_linear"
          x1={587.911}
          y1={909.71}
          x2={821.907}
          y2={909.71}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0F2335" />
          <Stop offset={1} stopColor="#224762" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint35_linear"
          x1={675.386}
          y1={365.975}
          x2={734.363}
          y2={365.975}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFBF7" />
          <Stop offset={1} stopColor="#D1D3D4" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint36_linear"
          x1={675.135}
          y1={397.781}
          x2={734.614}
          y2={397.781}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint37_linear"
          x1={789.552}
          y1={398.071}
          x2={849.031}
          y2={398.071}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint38_linear"
          x1={892.091}
          y1={394.975}
          x2={951.57}
          y2={394.975}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint39_linear"
          x1={988.726}
          y1={400.091}
          x2={1048.21}
          y2={400.091}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F2B48B" />
          <Stop offset={0.57} stopColor="#F19D77" />
          <Stop offset={1} stopColor="#EF795A" />
        </LinearGradient>
      </Defs>
    </Svg>
    )
  })
}

export default SvgComponent
