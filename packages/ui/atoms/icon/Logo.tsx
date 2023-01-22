interface ILogoProps {
  variant?: 'mobile' | 'desktop'
  className?: string
}

export function Logo({ variant = 'mobile', className }: ILogoProps) {
  if (variant === 'mobile') {
    return (
      <svg className={className} width="60" height="20" viewBox="0 0 60 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.8269 1.24815H23.9638C24.0122 1.24815 24.0602 1.2572 24.1054 1.27451C24.1975 1.31031 24.2884 1.34768 24.3781 1.38741C26.6538 2.39056 28.2443 4.66711 28.2443 7.31227C28.2443 9.55657 27.0999 11.5357 25.3631 12.6966L29.8781 18.8284C29.9662 18.9476 29.9792 19.1065 29.9123 19.2391C29.8454 19.3713 29.7097 19.4551 29.5614 19.4551H25.6168C25.4917 19.4551 25.3741 19.3953 25.3002 19.2946L24.8147 18.6356L23.882 18.6364C23.7569 18.6364 23.6393 18.577 23.5653 18.4763L20.3643 14.129V19.0617C20.3643 19.2788 20.188 19.4551 19.9709 19.4551H16.7947C16.5775 19.4551 16.4013 19.2788 16.4013 19.0617V18.6364H15.0598C14.8423 18.6364 14.6664 18.4602 14.6664 18.243V0.822895C14.6664 0.605744 14.8423 0.429504 15.0598 0.429504H22.2286C22.2773 0.429504 22.3253 0.438552 22.3706 0.455862C22.8922 0.657671 23.3808 0.925177 23.8269 1.24815ZM17.072 17.8496H17.8423V12.2997C17.8423 12.0825 18.0185 11.9063 18.2356 11.9063H19.5059C19.6306 11.9063 19.7482 11.9657 19.8226 12.0664L24.0807 17.8496H24.8368C24.8037 17.8496 25.0079 17.8493 25.0142 17.8496H27.048L22.7423 12.0015C22.6759 11.9114 22.6511 11.7969 22.6739 11.6876C22.6971 11.5778 22.7659 11.483 22.8631 11.4271C24.5708 10.446 25.7227 8.60338 25.7227 6.49402C25.7227 5.00346 25.1479 3.64626 24.2081 2.6321C23.9796 2.38544 23.7294 2.15885 23.4603 1.95547C23.0626 1.65492 22.6239 1.40511 22.1538 1.21629H17.8489H15.4532V16.7647V17.8496H17.072ZM19.5775 13.1183C19.5775 13.3135 19.5775 13.1183 19.5775 13.1183L19.3069 12.6931H18.629V18.243C18.629 18.4602 18.4532 18.6364 18.2356 18.6364H17.188C17.188 18.6561 17.188 18.6683 17.188 18.6683H19.5775V13.1183ZM25.4969 3.01841C26.1377 4.02274 26.5094 5.21511 26.5094 6.49402C26.5094 8.73792 25.3647 10.7171 23.6283 11.878L28.1432 18.0098C28.2313 18.129 28.2443 18.2879 28.1774 18.4205C28.1106 18.5526 27.9748 18.6364 27.8265 18.6364H25.7923L25.8155 18.6683H28.7833L24.4772 12.8201C24.4107 12.7301 24.3859 12.6156 24.4091 12.5058C24.432 12.3965 24.5008 12.3017 24.598 12.2458C26.3061 11.2647 27.4575 9.42203 27.4575 7.31227C27.4575 5.59866 26.6975 4.06129 25.4969 3.01841ZM22.7356 4.48694C23.0209 4.98143 23.1841 5.5546 23.1841 6.16593C23.1841 7.90984 21.8548 9.34532 20.1554 9.51448C20.0449 9.5251 19.9331 9.531 19.8198 9.531H18.1043C18.3214 9.531 18.4973 9.35476 18.4973 9.13761C18.4906 9.34296 18.3257 9.50897 18.1208 9.51762C18.1102 9.52628 18.1043 9.531 18.1043 9.531L18.0909 9.51762C17.884 9.51094 17.7176 9.34414 17.7109 9.13722C17.7109 9.13289 17.7109 9.12895 17.7109 9.12463V3.19426C17.7109 2.97671 17.8867 2.80087 18.1043 2.80087H19.8198C21.0657 2.80087 22.1542 3.47947 22.7356 4.48694ZM18.4976 8.59158V8.74422H19.7231V4.63013C19.7231 4.41298 19.8993 4.23674 20.1165 4.23674H21.5291C21.0744 3.83312 20.4752 3.58765 19.8198 3.58765H18.4976V8.59158ZM22.1401 5.04202C22.039 5.02982 21.9363 5.02353 21.832 5.02353H20.5098V8.65059C21.598 8.34847 22.3973 7.34965 22.3973 6.16593C22.3973 5.7631 22.3049 5.38151 22.1401 5.04202Z"
          fill="#231F20"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.59087 1.89763C11.5264 2.70684 12.8651 4.58017 12.8651 6.7391C12.8651 7.38032 12.7447 7.9948 12.5252 8.56286C12.3525 9.00975 12.118 9.42793 11.832 9.80794C13.3206 10.745 14.3013 12.3618 14.3013 14.1946C14.3013 16.8854 12.1924 19.3567 9.45122 19.402C9.2679 19.4051 9.14123 19.4075 8.93706 19.4075H1.869C1.65146 19.4075 1.47561 19.2316 1.47561 19.0141V18.4893H0.393391C0.176239 18.4893 0 18.3131 0 18.0959V0.947987C0 0.730442 0.176239 0.554596 0.393391 0.554596H5.97876C7.37372 0.554596 8.6369 1.06443 9.59087 1.89763ZM7.46184 17.7025C7.6605 17.7025 7.78403 17.7002 7.96263 17.697C10.2789 17.6588 12.0393 15.5503 12.0393 13.2765C12.0393 11.5762 11.0389 10.0998 9.57593 9.34964C9.46696 9.29378 9.39024 9.19032 9.36821 9.06994C9.34618 8.94956 9.38159 8.82564 9.4642 8.73516C9.82848 8.33351 10.1192 7.86931 10.3159 7.36105C10.5012 6.88111 10.6027 6.36223 10.6027 5.82092C10.6027 4.52391 10.0323 3.34964 9.11723 2.52942C8.29504 1.7926 7.19512 1.34138 5.97876 1.34138H0.786782V17.7025H7.46184ZM11.0059 3.86892C11.2537 4.47395 11.3895 5.13288 11.3895 5.82092C11.3895 6.46176 11.2695 7.07623 11.0496 7.64468C10.8769 8.09118 10.6424 8.50975 10.3564 8.88976C10.6239 9.05814 10.8749 9.24854 11.107 9.45782C11.3938 9.10377 11.6259 8.70684 11.7911 8.27922C11.9768 7.79929 12.0783 7.2804 12.0783 6.7391C12.0783 5.65019 11.6762 4.64822 11.0059 3.86892ZM12.4524 11.3666C12.6935 11.9586 12.8261 12.603 12.8261 13.2765C12.8261 15.9673 10.7168 18.4385 7.97561 18.4838C7.79268 18.4869 7.66562 18.4893 7.46184 18.4893H2.26239V18.6207H8.93706C9.13611 18.6207 9.25964 18.6183 9.43824 18.6152C11.7545 18.577 13.5146 16.4684 13.5146 14.1946C13.5146 13.1203 13.1153 12.1356 12.4524 11.3666ZM9.31078 11.54C9.50275 11.9267 9.60936 12.3599 9.60936 12.8154C9.60936 14.4201 8.25807 15.7312 6.58379 15.7312C6.04209 15.7312 5.77695 15.7336 5.65657 15.7363C5.65421 15.7363 5.64752 15.7363 5.64752 15.7363L3.95279 15.7442C3.84815 15.7446 3.74744 15.7037 3.67349 15.6297C3.59914 15.5558 3.55744 15.4555 3.55744 15.3508V11.3052C3.55744 11.1156 3.69276 10.9531 3.87884 10.9181L7.76318 10.1954C7.84855 10.1797 7.93706 10.1927 8.01456 10.232C8.58065 10.5223 9.03423 10.9826 9.31078 11.54ZM5.25413 14.9515V12.3312C5.25413 12.1415 5.38906 11.9791 5.57553 11.9444L8.30252 11.437C8.15106 11.2635 7.97128 11.114 7.76908 10.9948L4.34422 11.6321V14.9559L5.25413 14.9515ZM8.71715 12.16L6.04091 12.6581V14.9456C6.18096 14.9448 6.35917 14.9444 6.58379 14.9444C7.81471 14.9444 8.82258 13.9952 8.82258 12.8154C8.82258 12.5872 8.786 12.3669 8.71715 12.16ZM8.33399 3.5542C8.3454 3.56561 8.35641 3.57859 8.36743 3.59315C8.36743 3.59315 8.36743 3.59354 8.36782 3.59354C8.40716 3.64626 8.43352 3.70841 8.44257 3.7749L8.44375 3.77372C8.48663 4.0601 8.48151 4.83351 8.39654 5.22611C8.39379 5.23752 8.39143 5.24854 8.38867 5.25916C8.21991 5.97002 7.76908 6.77529 6.8155 7.43422C6.48623 7.66199 6.14674 7.84767 5.81314 7.98969C5.55311 8.10023 5.29583 8.18442 5.04957 8.24146C4.98977 8.27844 4.91936 8.29968 4.84382 8.29968H3.99882C3.78167 8.29968 3.60543 8.12344 3.60543 7.90629V3.55302C3.60543 3.33548 3.78167 3.15963 3.99882 3.15963H6.55232C6.57632 3.15963 6.60032 3.1616 6.62392 3.16593L8.12431 3.44287C8.20692 3.45822 8.27891 3.49834 8.33399 3.5542ZM4.69473 7.5129C4.70653 7.50936 4.71873 7.5066 4.73092 7.50424C4.90283 7.47277 5.08261 7.42399 5.26593 7.35908V5.16435C5.26593 5.16907 5.30016 5.00896 5.29858 5.00778L5.40637 4.83115L5.66877 4.74932H7.66955C7.68529 4.55617 7.69001 4.33941 7.68529 4.16199L6.51652 3.94641H4.39221V7.5129H4.69473ZM7.4642 5.53611H6.05271V6.9889C6.15854 6.92635 6.26397 6.85908 6.36821 6.78709C6.92132 6.40511 7.26672 5.9653 7.4642 5.53611Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.2781 3.07506C46.6585 4.68678 48.2242 7.41259 48.2242 10.5015C48.2242 15.448 44.2089 19.4641 39.2632 19.4641C36.777 19.4641 34.5256 18.4488 32.9013 16.8107C30.5212 15.199 28.9556 12.4732 28.9556 9.38426C28.9556 4.43776 32.9709 0.422028 37.9162 0.422028C40.4028 0.422028 42.6542 1.43698 44.2781 3.07506ZM33.3729 16.1797C34.6727 17.0515 36.2356 17.5597 37.9162 17.5597C42.4276 17.5597 46.0905 13.8965 46.0905 9.38426C46.0905 7.15374 45.1955 5.13092 43.7451 3.65492C42.262 2.14547 40.1975 1.20881 37.9162 1.20881C33.4048 1.20881 29.7423 4.87207 29.7423 9.38426C29.7423 12.2155 31.1845 14.7124 33.3729 16.1797ZM46.419 6.54909C46.716 7.44012 46.8773 8.3937 46.8773 9.38426C46.8773 14.3308 42.8619 18.3465 37.9162 18.3465C37.5004 18.3465 37.0913 18.3182 36.6904 18.2631C37.4996 18.5318 38.3647 18.6773 39.2632 18.6773C43.7746 18.6773 47.4375 15.0137 47.4375 10.5015C47.4375 9.06837 47.0677 7.72061 46.419 6.54909ZM41.6389 5.15924C42.7211 6.17026 43.3981 7.61007 43.3981 9.20684C43.3981 12.2631 40.917 14.7446 37.8615 14.7446C37.2089 14.7446 36.5826 14.6313 36.0012 14.4236C34.5936 13.9208 33.4481 12.8642 32.8285 11.5164C32.5051 10.8131 32.3246 10.031 32.3246 9.20684C32.3246 6.15059 34.8057 3.66908 37.8615 3.66908C39.321 3.66908 40.6491 4.23517 41.6389 5.15924ZM34.6644 12.7194C34.3065 11.9865 34.1054 11.1632 34.1054 10.293C34.1054 9.34886 34.3423 8.4594 34.7596 7.68127C35.6762 5.97199 37.4638 4.7989 39.5268 4.7568C39.0087 4.56208 38.4473 4.45586 37.8615 4.45586C35.2396 4.45586 33.1113 6.58489 33.1113 9.20684C33.1113 9.91377 33.2659 10.5845 33.5433 11.1876C33.8116 11.7714 34.1951 12.2918 34.6644 12.7194ZM41.1609 5.79064C40.6841 5.62935 40.1731 5.54241 39.642 5.54241C37.8305 5.54241 36.2541 6.55932 35.4532 8.05303C35.0952 8.72061 34.8922 9.4834 34.8922 10.293C34.8922 11.6337 35.4485 12.8453 36.3426 13.7096C36.8198 13.8705 37.3305 13.9578 37.8615 13.9578C40.4831 13.9578 42.6113 11.8288 42.6113 9.20684C42.6113 7.86617 42.0551 6.65492 41.1609 5.79064Z"
          fill="#231F20"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M52.5059 14.4492L52.8124 14.3901C53.0012 14.3536 53.1888 14.4594 53.2557 14.6399C53.2679 14.6726 53.2809 14.7045 53.295 14.7359C53.3269 14.7383 53.3592 14.7391 53.3918 14.7391C54.2109 14.7391 54.8777 14.0813 54.8777 13.269C54.8777 13.1285 54.8812 12.9861 54.8316 12.8618L50.4858 8.61595C50.336 8.48692 50.1943 8.34805 50.0622 8.20132C49.3135 7.37008 48.8588 6.2741 48.8588 5.07347C48.8588 4.25089 49.0724 3.47748 49.4473 2.80478C50.2537 1.35789 51.808 0.37677 53.5921 0.37677C54.869 0.37677 56.0287 0.879917 56.8804 1.6966C58.4335 2.42909 59.5209 3.9763 59.5826 5.77882C59.5893 5.97236 59.454 6.14192 59.264 6.1785L55.987 6.8095C55.9626 6.81422 55.9378 6.81658 55.9127 6.81658L55.9095 6.81737C55.6924 6.81737 55.5161 6.64074 55.5161 6.42398C55.5161 6.38188 55.5228 6.34136 55.535 6.30911C55.5425 6.26859 55.546 6.22728 55.546 6.18519C55.546 6.04514 55.5031 5.91493 55.4304 5.80675L54.7266 5.94207C54.7022 5.94679 54.6774 5.94915 54.6526 5.94955L54.6491 5.94994C54.5051 5.94994 54.3792 5.87244 54.3108 5.75718C54.2156 5.87441 54.1585 6.02311 54.1585 6.18519C54.1585 6.25089 54.168 6.31461 54.1857 6.37559L58.0138 10.1152C58.1271 10.2202 58.4823 10.5699 58.6676 10.754C58.6676 10.754 58.7545 10.8386 58.7545 10.839C58.7644 10.8484 58.7738 10.8587 58.7825 10.8689C58.7825 10.8693 58.7825 10.8693 58.7829 10.8693C59.5433 11.7863 60 12.9598 60 14.2383C60 14.9948 59.8399 15.7147 59.5515 16.3665C58.7246 18.2359 56.8415 19.5444 54.6519 19.5444C53.2451 19.5444 51.9646 19.0038 51.0094 18.1219C49.6058 17.4271 48.5531 16.138 48.1857 14.5884C48.1609 14.4842 48.1798 14.3744 48.238 14.2843C48.2962 14.1942 48.3887 14.1317 48.4941 14.1116L51.5519 13.5227C51.7412 13.4861 51.9288 13.592 51.9953 13.7729C52.0956 14.0447 52.2754 14.2792 52.5059 14.4492ZM51.4056 17.4397C52.0059 17.7281 52.6798 17.8901 53.3918 17.8901C55.2593 17.8901 56.8663 16.7757 57.5716 15.1809C57.8167 14.6266 57.9528 14.0145 57.9528 13.3709C57.9528 12.2902 57.5688 11.2977 56.9296 10.5196L56.2038 9.81068L52.3108 6.00777C52.2726 5.9704 52.2423 5.92594 52.2219 5.87638C52.1507 5.70407 52.1113 5.51564 52.1113 5.31776C52.1113 4.50659 52.7738 3.84648 53.5921 3.84648C54.3187 3.84648 54.9225 4.36772 55.0484 5.05262L55.0488 5.05576C55.0504 5.06324 55.0515 5.07071 55.0527 5.07819L55.4988 4.99243L57.5102 4.60494C57.4024 3.71115 56.9894 2.90982 56.3781 2.30557C55.6637 1.59982 54.6786 1.16355 53.5921 1.16355C52.1043 1.16355 50.8072 1.98102 50.1345 3.18794C49.823 3.74695 49.6456 4.38975 49.6456 5.07347C49.6456 6.06756 50.0209 6.97551 50.6385 7.66552L51.0268 8.04475L55.4323 12.3484C55.4611 12.3768 55.4854 12.409 55.5043 12.4448C55.6357 12.6907 55.6644 12.9787 55.6644 13.269C55.6644 14.5137 54.6467 15.5259 53.3918 15.5259C53.2482 15.5259 53.1082 15.5125 52.9721 15.4873C52.7018 15.437 52.4485 15.3394 52.2207 15.2033C51.8765 14.9971 51.5921 14.7037 51.3985 14.3536L49.0645 14.8028C49.4556 15.9621 50.3084 16.9122 51.4056 17.4397ZM58.5091 11.8264C58.6589 12.3154 58.7396 12.8339 58.7396 13.3709C58.7396 14.1274 58.5795 14.8473 58.2911 15.4991C57.5079 17.2702 55.777 18.5373 53.7356 18.6659C54.0319 18.7261 54.3383 18.7576 54.6519 18.7576C56.5197 18.7576 58.1267 17.6431 58.832 16.0483C59.0771 15.494 59.2132 14.8819 59.2132 14.2383C59.2132 13.3516 58.9548 12.5247 58.5091 11.8264ZM54.1385 4.89605C54.0114 4.73594 53.8135 4.63326 53.5921 4.63326C53.2097 4.63326 52.8981 4.93893 52.8981 5.31776C52.8981 5.38385 52.9076 5.44719 52.9253 5.50816L53.3887 5.96096C53.4595 5.50226 53.7439 5.11241 54.1385 4.89605ZM55.7482 6.06599C55.7762 6.05301 55.8065 6.04317 55.8383 6.03688C55.8029 6.04357 55.773 6.0534 55.7482 6.06599ZM56.3131 5.94561C57.1432 5.7855 58.7707 5.47236 58.7707 5.47236C58.6959 4.85435 58.4756 4.28039 58.1448 3.7855C58.2478 4.14506 58.3088 4.52233 58.3222 4.91139C58.3289 5.10494 58.1936 5.27449 58.0035 5.31107L56.2325 5.65214C56.2691 5.74577 56.2966 5.84373 56.3131 5.94561Z"
          fill="#231F20"
        />
      </svg>
    )
  }

  return (
    <img
      className={className}
      src="data:image/png;base64,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"
      alt="logo"
      width={80}
      height={80}
    />
  )
}
