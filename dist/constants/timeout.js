"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* prettier-ignore */
const TIMEOUT_ERRORS = {
    900: { status: 900 },
    901: { status: 901 },
    902: { status: 902 },
    903: { status: 903 },
    904: { status: 904 },
    905: { status: 905 },
    906: { status: 906 },
    907: { status: 907 },
    908: { status: 908 },
    909: { status: 909 },
    910: { status: 910 },
    911: { status: 911 },
    912: { status: 912 },
    913: { status: 913 },
    914: { status: 914 },
    915: { status: 915 },
    916: { status: 916 },
    917: { status: 917 },
    918: { status: 918 },
    919: { status: 919 },
    920: { status: 920 },
    921: { status: 921 },
    922: { status: 922 },
    923: { status: 923 },
    924: { status: 924 },
    925: { status: 925 },
    926: { status: 926 },
    927: { status: 927 },
    928: { status: 928 },
    929: { status: 929 },
    930: { status: 930 },
    931: { status: 931 },
    932: { status: 932 },
    933: { status: 933 },
    934: { status: 934 },
    935: { status: 935 },
    936: { status: 936 },
    937: { status: 937 },
    938: { status: 938 },
    939: { status: 939 },
    940: { status: 940 },
    941: { status: 941 },
    942: { status: 942 },
    943: { status: 943 },
    944: { status: 944 },
    945: { status: 945 },
    946: { status: 946 },
    947: { status: 947 },
    948: { status: 948 },
    949: { status: 949 },
    950: { status: 950 },
    951: { status: 951 },
    952: { status: 952 },
    953: { status: 953 },
    954: { status: 954 },
    955: { status: 955 },
    956: { status: 956 },
    957: { status: 957 },
    958: { status: 958 },
    959: { status: 959 },
    960: { status: 960 },
    961: { status: 961 },
    962: { status: 962 },
    963: { status: 963 },
    964: { status: 964 },
    965: { status: 965 },
    966: { status: 966 },
    967: { status: 967 },
    968: { status: 968 },
    969: { status: 969 },
    970: { status: 970 },
    971: { status: 971 },
    972: { status: 972 },
    973: { status: 973 },
    974: { status: 974 },
    975: { status: 975 },
    976: { status: 976 },
    977: { status: 977 },
    978: { status: 978 },
    979: { status: 979 },
    980: { status: 980 },
    981: { status: 981 },
    982: { status: 982 },
    983: { status: 983 },
    984: { status: 984 },
    985: { status: 985 },
    986: { status: 986 },
    987: { status: 987 },
    988: { status: 988 },
    989: { status: 989 },
    990: { status: 990 },
    991: { status: 991 },
    992: { status: 992 },
    993: { status: 993 },
    994: { status: 994 },
    995: { status: 995 },
    996: { status: 996 },
    997: { status: 997 },
    998: { status: 998 },
    999: { status: 999 },
};
exports.default = TIMEOUT_ERRORS;