PGDMP  (    ;                |            redsteam    16.2    16.2 z    u           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            v           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            w           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            x           1262    193461    redsteam    DATABASE     �   CREATE DATABASE redsteam WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE redsteam;
                postgres    false                        3079    193462 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            y           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    193570 
   developers    TABLE     �   CREATE TABLE public.developers (
    name character varying NOT NULL,
    website character varying NOT NULL,
    developer_id integer NOT NULL
);
    DROP TABLE public.developers;
       public         heap    postgres    false            �            1259    193569    developers_developer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.developers_developer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.developers_developer_id_seq;
       public          postgres    false    232            z           0    0    developers_developer_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.developers_developer_id_seq OWNED BY public.developers.developer_id;
          public          postgres    false    231            �            1259    193474    features    TABLE     �   CREATE TABLE public.features (
    feature_id integer NOT NULL,
    name character varying NOT NULL,
    icon bytea NOT NULL
);
    DROP TABLE public.features;
       public         heap    postgres    false            �            1259    193473    features_feature_id_seq    SEQUENCE     �   CREATE SEQUENCE public.features_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.features_feature_id_seq;
       public          postgres    false    217            {           0    0    features_feature_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.features_feature_id_seq OWNED BY public.features.feature_id;
          public          postgres    false    216            �            1259    193542    games    TABLE     �  CREATE TABLE public.games (
    game_id integer NOT NULL,
    name character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    description text NOT NULL,
    "releaseDate" timestamp without time zone DEFAULT '2024-12-01 13:15:02.066'::timestamp without time zone NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    "thumbnailEntries" jsonb NOT NULL,
    "imageEntries" jsonb,
    "videoEntries" jsonb,
    "languageSupport" jsonb,
    "platformEntries" jsonb NOT NULL,
    link character varying,
    about text NOT NULL,
    mature boolean DEFAULT false NOT NULL,
    "matureDescription" text NOT NULL,
    "systemRequirements" jsonb NOT NULL,
    legal text,
    "totalSales" integer DEFAULT 0 NOT NULL,
    "averageRating" double precision DEFAULT '0'::double precision NOT NULL,
    "reviewsCount" integer DEFAULT 0 NOT NULL,
    pricing_id integer,
    "storageName" character varying(50) NOT NULL
);
    DROP TABLE public.games;
       public         heap    postgres    false            �            1259    193592    games_developers    TABLE     {   CREATE TABLE public.games_developers (
    "gamesGameId" integer NOT NULL,
    "developersDeveloperId" integer NOT NULL
);
 $   DROP TABLE public.games_developers;
       public         heap    postgres    false            �            1259    193606    games_features    TABLE     u   CREATE TABLE public.games_features (
    "gamesGameId" integer NOT NULL,
    "featuresFeatureId" integer NOT NULL
);
 "   DROP TABLE public.games_features;
       public         heap    postgres    false            �            1259    193541    games_game_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.games_game_id_seq;
       public          postgres    false    228            |           0    0    games_game_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;
          public          postgres    false    227            �            1259    193613    games_languages    TABLE     x   CREATE TABLE public.games_languages (
    "gamesGameId" integer NOT NULL,
    "languagesLanguageId" integer NOT NULL
);
 #   DROP TABLE public.games_languages;
       public         heap    postgres    false            �            1259    193483    games_pricing    TABLE     �  CREATE TABLE public.games_pricing (
    pricing_id integer NOT NULL,
    free boolean DEFAULT false NOT NULL,
    discount boolean DEFAULT false NOT NULL,
    "discountStartDate" timestamp without time zone,
    "discountEndDate" timestamp without time zone,
    "offerType" character varying,
    "basePrice" numeric(10,2) DEFAULT 0.00 NOT NULL,
    "discountPrice" numeric(10,2),
    price numeric(10,2) DEFAULT 0.00 NOT NULL,
    "discountPercentage" double precision
);
 !   DROP TABLE public.games_pricing;
       public         heap    postgres    false            �            1259    193482    games_pricing_pricing_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_pricing_pricing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.games_pricing_pricing_id_seq;
       public          postgres    false    219            }           0    0    games_pricing_pricing_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.games_pricing_pricing_id_seq OWNED BY public.games_pricing.pricing_id;
          public          postgres    false    218            �            1259    193585    games_publishers    TABLE     {   CREATE TABLE public.games_publishers (
    "gamesGameId" integer NOT NULL,
    "publishersPublisherId" integer NOT NULL
);
 $   DROP TABLE public.games_publishers;
       public         heap    postgres    false            �            1259    193599 
   games_tags    TABLE     i   CREATE TABLE public.games_tags (
    "gamesGameId" integer NOT NULL,
    "tagsTagId" integer NOT NULL
);
    DROP TABLE public.games_tags;
       public         heap    postgres    false            �            1259    193533 	   languages    TABLE     i   CREATE TABLE public.languages (
    language_id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.languages;
       public         heap    postgres    false            �            1259    193532    languages_language_id_seq    SEQUENCE     �   CREATE SEQUENCE public.languages_language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.languages_language_id_seq;
       public          postgres    false    226            ~           0    0    languages_language_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.languages_language_id_seq OWNED BY public.languages.language_id;
          public          postgres    false    225            �            1259    193561 
   publishers    TABLE     �   CREATE TABLE public.publishers (
    name character varying NOT NULL,
    website character varying NOT NULL,
    publisher_id integer NOT NULL
);
    DROP TABLE public.publishers;
       public         heap    postgres    false            �            1259    193560    publishers_publisher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.publishers_publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.publishers_publisher_id_seq;
       public          postgres    false    230                       0    0    publishers_publisher_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.publishers_publisher_id_seq OWNED BY public.publishers.publisher_id;
          public          postgres    false    229            �            1259    194134    query-result-cache    TABLE     �   CREATE TABLE public."query-result-cache" (
    id integer NOT NULL,
    identifier character varying,
    "time" bigint NOT NULL,
    duration integer NOT NULL,
    query text NOT NULL,
    result text NOT NULL
);
 (   DROP TABLE public."query-result-cache";
       public         heap    postgres    false            �            1259    194133    query-result-cache_id_seq    SEQUENCE     �   CREATE SEQUENCE public."query-result-cache_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."query-result-cache_id_seq";
       public          postgres    false    240            �           0    0    query-result-cache_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."query-result-cache_id_seq" OWNED BY public."query-result-cache".id;
          public          postgres    false    239            �            1259    193494    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    positive boolean NOT NULL,
    date timestamp without time zone DEFAULT '2024-12-01 13:15:02.063'::timestamp without time zone NOT NULL,
    content character varying NOT NULL,
    user_id uuid,
    game_id integer
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    193493    reviews_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    221            �           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    220            �            1259    193524    tags    TABLE     _   CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    193523    tags_tag_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.tags_tag_id_seq;
       public          postgres    false    224            �           0    0    tags_tag_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;
          public          postgres    false    223            �            1259    193503    users    TABLE     �  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    country character varying NOT NULL,
    "phoneNumber" character varying,
    "profilePicture" character varying,
    "verificationToken" character varying,
    "isVerified" boolean DEFAULT false NOT NULL,
    "phoneVerificationCode" character varying,
    "isPhoneVerified" boolean,
    "passwordResetToken" character varying,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "isLoggedIn" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2024-12-01 13:15:02.065'::timestamp without time zone NOT NULL,
    wishlist jsonb DEFAULT '[]'::jsonb NOT NULL,
    cart jsonb DEFAULT '[]'::jsonb NOT NULL,
    library jsonb DEFAULT '[]'::jsonb NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            �            1259    193578 
   users_tags    TABLE     f   CREATE TABLE public.users_tags (
    "usersUserId" uuid NOT NULL,
    "tagsTagId" integer NOT NULL
);
    DROP TABLE public.users_tags;
       public         heap    postgres    false            �           2604    193573    developers developer_id    DEFAULT     �   ALTER TABLE ONLY public.developers ALTER COLUMN developer_id SET DEFAULT nextval('public.developers_developer_id_seq'::regclass);
 F   ALTER TABLE public.developers ALTER COLUMN developer_id DROP DEFAULT;
       public          postgres    false    232    231    232            i           2604    193477    features feature_id    DEFAULT     z   ALTER TABLE ONLY public.features ALTER COLUMN feature_id SET DEFAULT nextval('public.features_feature_id_seq'::regclass);
 B   ALTER TABLE public.features ALTER COLUMN feature_id DROP DEFAULT;
       public          postgres    false    217    216    217            |           2604    193545    games game_id    DEFAULT     n   ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);
 <   ALTER TABLE public.games ALTER COLUMN game_id DROP DEFAULT;
       public          postgres    false    227    228    228            j           2604    193486    games_pricing pricing_id    DEFAULT     �   ALTER TABLE ONLY public.games_pricing ALTER COLUMN pricing_id SET DEFAULT nextval('public.games_pricing_pricing_id_seq'::regclass);
 G   ALTER TABLE public.games_pricing ALTER COLUMN pricing_id DROP DEFAULT;
       public          postgres    false    219    218    219            {           2604    193536    languages language_id    DEFAULT     ~   ALTER TABLE ONLY public.languages ALTER COLUMN language_id SET DEFAULT nextval('public.languages_language_id_seq'::regclass);
 D   ALTER TABLE public.languages ALTER COLUMN language_id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    193564    publishers publisher_id    DEFAULT     �   ALTER TABLE ONLY public.publishers ALTER COLUMN publisher_id SET DEFAULT nextval('public.publishers_publisher_id_seq'::regclass);
 F   ALTER TABLE public.publishers ALTER COLUMN publisher_id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    194137    query-result-cache id    DEFAULT     �   ALTER TABLE ONLY public."query-result-cache" ALTER COLUMN id SET DEFAULT nextval('public."query-result-cache_id_seq"'::regclass);
 F   ALTER TABLE public."query-result-cache" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239    240            o           2604    193497    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    220    221    221            z           2604    193527    tags tag_id    DEFAULT     j   ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);
 :   ALTER TABLE public.tags ALTER COLUMN tag_id DROP DEFAULT;
       public          postgres    false    223    224    224            j          0    193570 
   developers 
   TABLE DATA           A   COPY public.developers (name, website, developer_id) FROM stdin;
    public          postgres    false    232   �       [          0    193474    features 
   TABLE DATA           :   COPY public.features (feature_id, name, icon) FROM stdin;
    public          postgres    false    217   \�       f          0    193542    games 
   TABLE DATA           I  COPY public.games (game_id, name, category, description, "releaseDate", featured, "thumbnailEntries", "imageEntries", "videoEntries", "languageSupport", "platformEntries", link, about, mature, "matureDescription", "systemRequirements", legal, "totalSales", "averageRating", "reviewsCount", pricing_id, "storageName") FROM stdin;
    public          postgres    false    228   4      m          0    193592    games_developers 
   TABLE DATA           R   COPY public.games_developers ("gamesGameId", "developersDeveloperId") FROM stdin;
    public          postgres    false    235   ��      o          0    193606    games_features 
   TABLE DATA           L   COPY public.games_features ("gamesGameId", "featuresFeatureId") FROM stdin;
    public          postgres    false    237   4�      p          0    193613    games_languages 
   TABLE DATA           O   COPY public.games_languages ("gamesGameId", "languagesLanguageId") FROM stdin;
    public          postgres    false    238   ��      ]          0    193483    games_pricing 
   TABLE DATA           �   COPY public.games_pricing (pricing_id, free, discount, "discountStartDate", "discountEndDate", "offerType", "basePrice", "discountPrice", price, "discountPercentage") FROM stdin;
    public          postgres    false    219   ��      l          0    193585    games_publishers 
   TABLE DATA           R   COPY public.games_publishers ("gamesGameId", "publishersPublisherId") FROM stdin;
    public          postgres    false    234   ��      n          0    193599 
   games_tags 
   TABLE DATA           @   COPY public.games_tags ("gamesGameId", "tagsTagId") FROM stdin;
    public          postgres    false    236   R�      d          0    193533 	   languages 
   TABLE DATA           6   COPY public.languages (language_id, name) FROM stdin;
    public          postgres    false    226   �      h          0    193561 
   publishers 
   TABLE DATA           A   COPY public.publishers (name, website, publisher_id) FROM stdin;
    public          postgres    false    230   <�      r          0    194134    query-result-cache 
   TABLE DATA           _   COPY public."query-result-cache" (id, identifier, "time", duration, query, result) FROM stdin;
    public          postgres    false    240   K�      _          0    193494    reviews 
   TABLE DATA           W   COPY public.reviews (review_id, positive, date, content, user_id, game_id) FROM stdin;
    public          postgres    false    221   h�      b          0    193524    tags 
   TABLE DATA           ,   COPY public.tags (tag_id, name) FROM stdin;
    public          postgres    false    224   ��      `          0    193503    users 
   TABLE DATA             COPY public.users (user_id, email, username, password, country, "phoneNumber", "profilePicture", "verificationToken", "isVerified", "phoneVerificationCode", "isPhoneVerified", "passwordResetToken", "isAdmin", "isActive", "isLoggedIn", "createdAt", wishlist, cart, library) FROM stdin;
    public          postgres    false    222   ��      k          0    193578 
   users_tags 
   TABLE DATA           @   COPY public.users_tags ("usersUserId", "tagsTagId") FROM stdin;
    public          postgres    false    233   ��      �           0    0    developers_developer_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.developers_developer_id_seq', 28, true);
          public          postgres    false    231            �           0    0    features_feature_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.features_feature_id_seq', 27, true);
          public          postgres    false    216            �           0    0    games_game_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.games_game_id_seq', 24, true);
          public          postgres    false    227            �           0    0    games_pricing_pricing_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.games_pricing_pricing_id_seq', 24, true);
          public          postgres    false    218            �           0    0    languages_language_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.languages_language_id_seq', 32, true);
          public          postgres    false    225            �           0    0    publishers_publisher_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.publishers_publisher_id_seq', 23, true);
          public          postgres    false    229            �           0    0    query-result-cache_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."query-result-cache_id_seq"', 1, false);
          public          postgres    false    239            �           0    0    reviews_review_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_review_id_seq', 19, true);
          public          postgres    false    220            �           0    0    tags_tag_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tags_tag_id_seq', 140, true);
          public          postgres    false    223            �           2606    193555 $   games PK_00f32d6507b00b23b8cd327fba7 
   CONSTRAINT     i   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "PK_00f32d6507b00b23b8cd327fba7" PRIMARY KEY (game_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "PK_00f32d6507b00b23b8cd327fba7";
       public            postgres    false    228            �           2606    193531 #   tags PK_06a35221325edeb80ad2ec1ff85 
   CONSTRAINT     g   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_06a35221325edeb80ad2ec1ff85" PRIMARY KEY (tag_id);
 O   ALTER TABLE ONLY public.tags DROP CONSTRAINT "PK_06a35221325edeb80ad2ec1ff85";
       public            postgres    false    224            �           2606    193540 (   languages PK_108420613c85f301619cf49234d 
   CONSTRAINT     q   ALTER TABLE ONLY public.languages
    ADD CONSTRAINT "PK_108420613c85f301619cf49234d" PRIMARY KEY (language_id);
 T   ALTER TABLE ONLY public.languages DROP CONSTRAINT "PK_108420613c85f301619cf49234d";
       public            postgres    false    226            �           2606    193577 )   developers PK_3654a1cdb53b1c2af298a93be3e 
   CONSTRAINT     s   ALTER TABLE ONLY public.developers
    ADD CONSTRAINT "PK_3654a1cdb53b1c2af298a93be3e" PRIMARY KEY (developer_id);
 U   ALTER TABLE ONLY public.developers DROP CONSTRAINT "PK_3654a1cdb53b1c2af298a93be3e";
       public            postgres    false    232            �           2606    193603 )   games_tags PK_37631a5e36fe26063bc7d4e6498 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "PK_37631a5e36fe26063bc7d4e6498" PRIMARY KEY ("gamesGameId", "tagsTagId");
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "PK_37631a5e36fe26063bc7d4e6498";
       public            postgres    false    236    236            �           2606    194141 1   query-result-cache PK_6a98f758d8bfd010e7e10ffd3d3 
   CONSTRAINT     s   ALTER TABLE ONLY public."query-result-cache"
    ADD CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY (id);
 _   ALTER TABLE ONLY public."query-result-cache" DROP CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3";
       public            postgres    false    240            �           2606    193610 -   games_features PK_721440dcc12fe425e7365848ecf 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "PK_721440dcc12fe425e7365848ecf" PRIMARY KEY ("gamesGameId", "featuresFeatureId");
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "PK_721440dcc12fe425e7365848ecf";
       public            postgres    false    237    237            �           2606    193589 /   games_publishers PK_8210a5d0a29975eca0b7c1d1070 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "PK_8210a5d0a29975eca0b7c1d1070" PRIMARY KEY ("gamesGameId", "publishersPublisherId");
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "PK_8210a5d0a29975eca0b7c1d1070";
       public            postgres    false    234    234            �           2606    193617 .   games_languages PK_8e72b9c3144c27c370c3bed136c 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "PK_8e72b9c3144c27c370c3bed136c" PRIMARY KEY ("gamesGameId", "languagesLanguageId");
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "PK_8e72b9c3144c27c370c3bed136c";
       public            postgres    false    238    238            �           2606    193518 $   users PK_96aac72f1574b88752e9fb00089 
   CONSTRAINT     i   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089";
       public            postgres    false    222            �           2606    193492 ,   games_pricing PK_9d094279e2ae1d10d9190cc148f 
   CONSTRAINT     t   ALTER TABLE ONLY public.games_pricing
    ADD CONSTRAINT "PK_9d094279e2ae1d10d9190cc148f" PRIMARY KEY (pricing_id);
 X   ALTER TABLE ONLY public.games_pricing DROP CONSTRAINT "PK_9d094279e2ae1d10d9190cc148f";
       public            postgres    false    219            �           2606    193502 &   reviews PK_bfe951d9dca4ba99674c5772905 
   CONSTRAINT     m   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "PK_bfe951d9dca4ba99674c5772905" PRIMARY KEY (review_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "PK_bfe951d9dca4ba99674c5772905";
       public            postgres    false    221            �           2606    193568 )   publishers PK_d25990ded6d8012396ef6c10767 
   CONSTRAINT     s   ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT "PK_d25990ded6d8012396ef6c10767" PRIMARY KEY (publisher_id);
 U   ALTER TABLE ONLY public.publishers DROP CONSTRAINT "PK_d25990ded6d8012396ef6c10767";
       public            postgres    false    230            �           2606    193481 '   features PK_d9dfbe2f2d417905e38c3b1bfae 
   CONSTRAINT     o   ALTER TABLE ONLY public.features
    ADD CONSTRAINT "PK_d9dfbe2f2d417905e38c3b1bfae" PRIMARY KEY (feature_id);
 S   ALTER TABLE ONLY public.features DROP CONSTRAINT "PK_d9dfbe2f2d417905e38c3b1bfae";
       public            postgres    false    217            �           2606    193582 )   users_tags PK_e56a45a71b04e7f614dbd141184 
   CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "PK_e56a45a71b04e7f614dbd141184" PRIMARY KEY ("usersUserId", "tagsTagId");
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "PK_e56a45a71b04e7f614dbd141184";
       public            postgres    false    233    233            �           2606    193596 /   games_developers PK_f4fc96b9ca229d9159425d00b3e 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "PK_f4fc96b9ca229d9159425d00b3e" PRIMARY KEY ("gamesGameId", "developersDeveloperId");
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "PK_f4fc96b9ca229d9159425d00b3e";
       public            postgres    false    235    235            �           2606    193559 $   games REL_fa5e581bc2c90e64529e286ca2 
   CONSTRAINT     g   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "REL_fa5e581bc2c90e64529e286ca2" UNIQUE (pricing_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "REL_fa5e581bc2c90e64529e286ca2";
       public            postgres    false    228            �           2606    193557 $   games UQ_28639e6be5f363b0257ec04e14f 
   CONSTRAINT     a   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f" UNIQUE (name);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f";
       public            postgres    false    228            �           2606    193520 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public            postgres    false    222            �           2606    194726 $   games UQ_cc87e84f58757a2aa892996e0fb 
   CONSTRAINT     j   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "UQ_cc87e84f58757a2aa892996e0fb" UNIQUE ("storageName");
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "UQ_cc87e84f58757a2aa892996e0fb";
       public            postgres    false    228            �           2606    193522 $   users UQ_fe0bb3f6520ee0469504521e710 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710";
       public            postgres    false    222            �           1259    193605    IDX_087d6d70218c721dda01d0d7a0    INDEX     ^   CREATE INDEX "IDX_087d6d70218c721dda01d0d7a0" ON public.games_tags USING btree ("tagsTagId");
 4   DROP INDEX public."IDX_087d6d70218c721dda01d0d7a0";
       public            postgres    false    236            �           1259    193618    IDX_0ce44bcc42a9812ac7f5c3cb27    INDEX     e   CREATE INDEX "IDX_0ce44bcc42a9812ac7f5c3cb27" ON public.games_languages USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_0ce44bcc42a9812ac7f5c3cb27";
       public            postgres    false    238            �           1259    193584    IDX_54d7c2f9e0970e204bca905d84    INDEX     ^   CREATE INDEX "IDX_54d7c2f9e0970e204bca905d84" ON public.users_tags USING btree ("tagsTagId");
 4   DROP INDEX public."IDX_54d7c2f9e0970e204bca905d84";
       public            postgres    false    233            �           1259    193619    IDX_581f665b8e1a665600c06581e2    INDEX     m   CREATE INDEX "IDX_581f665b8e1a665600c06581e2" ON public.games_languages USING btree ("languagesLanguageId");
 4   DROP INDEX public."IDX_581f665b8e1a665600c06581e2";
       public            postgres    false    238            �           1259    193591    IDX_5c7c4ff7ecb8ed0ad5f3b65558    INDEX     p   CREATE INDEX "IDX_5c7c4ff7ecb8ed0ad5f3b65558" ON public.games_publishers USING btree ("publishersPublisherId");
 4   DROP INDEX public."IDX_5c7c4ff7ecb8ed0ad5f3b65558";
       public            postgres    false    234            �           1259    193597    IDX_6f64008706763b172c4b2d7f39    INDEX     f   CREATE INDEX "IDX_6f64008706763b172c4b2d7f39" ON public.games_developers USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_6f64008706763b172c4b2d7f39";
       public            postgres    false    235            �           1259    193611    IDX_72ae624da5548e602a1d84047f    INDEX     d   CREATE INDEX "IDX_72ae624da5548e602a1d84047f" ON public.games_features USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_72ae624da5548e602a1d84047f";
       public            postgres    false    237            �           1259    193612    IDX_95584abd9a452f258dd69901e2    INDEX     j   CREATE INDEX "IDX_95584abd9a452f258dd69901e2" ON public.games_features USING btree ("featuresFeatureId");
 4   DROP INDEX public."IDX_95584abd9a452f258dd69901e2";
       public            postgres    false    237            �           1259    193598    IDX_c0c7b8ce8e0e786ca57c57f982    INDEX     p   CREATE INDEX "IDX_c0c7b8ce8e0e786ca57c57f982" ON public.games_developers USING btree ("developersDeveloperId");
 4   DROP INDEX public."IDX_c0c7b8ce8e0e786ca57c57f982";
       public            postgres    false    235            �           1259    193604    IDX_c2513018e2c3dbfe7eaee4cc88    INDEX     `   CREATE INDEX "IDX_c2513018e2c3dbfe7eaee4cc88" ON public.games_tags USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_c2513018e2c3dbfe7eaee4cc88";
       public            postgres    false    236            �           1259    193590    IDX_c79bfdc4074332c6b8b7b95cb1    INDEX     f   CREATE INDEX "IDX_c79bfdc4074332c6b8b7b95cb1" ON public.games_publishers USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_c79bfdc4074332c6b8b7b95cb1";
       public            postgres    false    234            �           1259    193583    IDX_e4142465994684d8d568daeec2    INDEX     `   CREATE INDEX "IDX_e4142465994684d8d568daeec2" ON public.users_tags USING btree ("usersUserId");
 4   DROP INDEX public."IDX_e4142465994684d8d568daeec2";
       public            postgres    false    233            �           2606    193670 )   games_tags FK_087d6d70218c721dda01d0d7a0d    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "FK_087d6d70218c721dda01d0d7a0d" FOREIGN KEY ("tagsTagId") REFERENCES public.tags(tag_id);
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "FK_087d6d70218c721dda01d0d7a0d";
       public          postgres    false    224    4755    236            �           2606    193685 .   games_languages FK_0ce44bcc42a9812ac7f5c3cb272    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "FK_0ce44bcc42a9812ac7f5c3cb272" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "FK_0ce44bcc42a9812ac7f5c3cb272";
       public          postgres    false    238    228    4759            �           2606    193640 )   users_tags FK_54d7c2f9e0970e204bca905d84d    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "FK_54d7c2f9e0970e204bca905d84d" FOREIGN KEY ("tagsTagId") REFERENCES public.tags(tag_id);
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "FK_54d7c2f9e0970e204bca905d84d";
       public          postgres    false    4755    233    224            �           2606    193690 .   games_languages FK_581f665b8e1a665600c06581e21    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "FK_581f665b8e1a665600c06581e21" FOREIGN KEY ("languagesLanguageId") REFERENCES public.languages(language_id);
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "FK_581f665b8e1a665600c06581e21";
       public          postgres    false    4757    238    226            �           2606    193650 /   games_publishers FK_5c7c4ff7ecb8ed0ad5f3b655582    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "FK_5c7c4ff7ecb8ed0ad5f3b655582" FOREIGN KEY ("publishersPublisherId") REFERENCES public.publishers(publisher_id);
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "FK_5c7c4ff7ecb8ed0ad5f3b655582";
       public          postgres    false    230    4767    234            �           2606    193655 /   games_developers FK_6f64008706763b172c4b2d7f39f    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "FK_6f64008706763b172c4b2d7f39f" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "FK_6f64008706763b172c4b2d7f39f";
       public          postgres    false    4759    228    235            �           2606    193620 &   reviews FK_728447781a30bc3fcfe5c2f1cdf    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf";
       public          postgres    false    4749    222    221            �           2606    193675 -   games_features FK_72ae624da5548e602a1d84047f8    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "FK_72ae624da5548e602a1d84047f8" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "FK_72ae624da5548e602a1d84047f8";
       public          postgres    false    228    237    4759            �           2606    193680 -   games_features FK_95584abd9a452f258dd69901e2a    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "FK_95584abd9a452f258dd69901e2a" FOREIGN KEY ("featuresFeatureId") REFERENCES public.features(feature_id);
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "FK_95584abd9a452f258dd69901e2a";
       public          postgres    false    4743    237    217            �           2606    193625 &   reviews FK_98c034c1b44b843c9c4641b1dbe    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_98c034c1b44b843c9c4641b1dbe" FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "FK_98c034c1b44b843c9c4641b1dbe";
       public          postgres    false    4759    221    228            �           2606    193660 /   games_developers FK_c0c7b8ce8e0e786ca57c57f982e    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "FK_c0c7b8ce8e0e786ca57c57f982e" FOREIGN KEY ("developersDeveloperId") REFERENCES public.developers(developer_id);
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "FK_c0c7b8ce8e0e786ca57c57f982e";
       public          postgres    false    232    4769    235            �           2606    193665 )   games_tags FK_c2513018e2c3dbfe7eaee4cc889    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "FK_c2513018e2c3dbfe7eaee4cc889" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "FK_c2513018e2c3dbfe7eaee4cc889";
       public          postgres    false    236    228    4759            �           2606    193645 /   games_publishers FK_c79bfdc4074332c6b8b7b95cb17    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "FK_c79bfdc4074332c6b8b7b95cb17" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "FK_c79bfdc4074332c6b8b7b95cb17";
       public          postgres    false    234    228    4759            �           2606    193635 )   users_tags FK_e4142465994684d8d568daeec2d    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "FK_e4142465994684d8d568daeec2d" FOREIGN KEY ("usersUserId") REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "FK_e4142465994684d8d568daeec2d";
       public          postgres    false    233    4749    222            �           2606    193630 $   games FK_fa5e581bc2c90e64529e286ca23    FK CONSTRAINT     �   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "FK_fa5e581bc2c90e64529e286ca23" FOREIGN KEY (pricing_id) REFERENCES public.games_pricing(pricing_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "FK_fa5e581bc2c90e64529e286ca23";
       public          postgres    false    4745    228    219            j   7  x�}��r�0��٧��ozG�0	�B��tz#�"�����Q��/֕%�m2�d�w�ݳ2O���u1�����ֻ�S��Ud���L[�6]o,4S�p�2�/��x�nK�;|Fro!.�����ˬb��HJrY�ׁ���L�=��Uy�7�X�%ӕ\�#Q�ּ�QΜ��ܵ=X�����
�u�����>�$Ds�O�^��9��� ��7�Ĕ��zE��dCxT�`R����oF�
�t�LE�7�:n��N*��[HB��=.�����KV�؆p�.f^(��Y�� (�!�� �D�����2I.l�
���с{"b½9I�<��뜣��	����(���Y���vp��iN?mk�sf�~��>|%ɡ��T*!1�� ��o#�RF"�\Cx����q1����wx���cR�r��DN-Z,���+�\߿��]�ǩ�hÒ�,>���UPz3A cˬY,����6όvY�ut T'�@���ⴚ1�b�4g��ym�(9���Pn�'T��J�F-��և��L-�����Q�f ���|~^�轙H�!���/4��      [      x���]�.;��	ӿb���v�%�tX�mc�fS�Xe���>+�&#ɴ�?��6�6P�����M��x�}����q���~���?���������������|��ʵ��կ����RM)Ǐ_���_��|���}�x��Z�������<OI�<��'_W
O�5~�Wj�z�S�����Ri%���{~�*^O��RM+ͻ?^q����:��g��7���}J-﹟�䒸�w(O{��b�g�qb��O�\��}%��n�[��tG�������;׻o>�}��W�w�Oý�/���߼�o��3������8~s^~�gʧ��8#;�}���+.Fs�?�o�p�w����ɫ���~��7����rw�����?�/~y�����Rz~�\��X���γ����U�M���-�}���z�q|\��wae��Ry&�`�X���w���;��;3�s�>���W����Ѿ��J��H�h�������WD*��\o��k�H��{���mE��x��j�~�'���{��;{��ܢ��-����y����n��=���+����۫a���k��ԓk|�ʏc�ؕw�>��s�WYi�8�t�
£|���W�&%���?�V�-w}�>�*����:��d5N)�����{�����{��ս�+���~v���Z��|ۼ�o��߾��K���~�����������;�~�w,��_~���J��,��R�*���p];��)�u�=[�����
��{#����R�Wxr��h.��j�1������N������g��_��k_׸F����-�hi�M�5ҽw�w�e���^7[G��hm��C}�v�z�Eؽ'�5�s���1��*���ꝯ���p�e�+<u�k�z،��؈��V,������s�=�aRq���g3��e�aB�!��,�Y�H!���(O�Z�w����Kö��(k��׽����J�g�0�U�tt&!<}^��\v� ��1VdiJ
u�&�ď�RX���7+�b��`1@���C9,��G���m��zH�ד�=�z^�h���γ��끋�s�#ZZ��LC8R�L��\wմ�8��=c��������a����iT�X�Q7�o�O�L�]�h>����O�k�C�q�t��w۵�s��Os��=WG=j�N�\�O���F����0/������h��{�e�A5 �cOc#�5�m����bAl���e%$���'0AW��7�@��y��q.���(�S��&��|}���(n�h����3��>���0ͫ��OEE��ʔ.�$$wRn��b{�6�U�~P�}�pP��1�ot�M�X���c^K��k�W���PҺ�̬Tt���|�dy�+��oE�i��.��b���ПxC����u�0vcP?�ׅ�!YژW��F�3�n��)�Z6�:BG;����x*z�GF�w���4��$i:q�4'÷Q���1�O@/�Yy슽)��X���F���=[Eg3+����]Pd��h&)�6K����l�TO�>���L
�e�r�>�fd�q0�ᴙ61P�'����0�=�3�sB<����Z�M\9`Ab),也�o���O,�S���3��Y�F����ߣ,{�Ť�Sd���?��_�_��_)É���p�/��2��e8�� ��0��kf��^�ry���r���������oe9wWc@��P�)��U�I&�0����YV�d�M,�����|u�����}��,��i^��������g9������K���b9��p��:Ϛ!O�d���� �Ƚ������^�P�T��� (���]���\
����=�|���/'�$,`m�oçofܝ�t͐���(<��@4�X�U�#�q�.g4��}�h{�^=�q�l��  ����K�X��Up�w
Z'�_������������j��������ݏ���?�J�pa�`E��u���W����_ރp$�S��}��|�a@���/�,� ��B�.�Rt�u~������떁�L�+�[p��e�#+{��#U�,�6��JuU�j�Y 7İ�ס��x
�n��:��V��ܱc`�O��:�%��u��i�N��nې�aF�gܒ�y����5�o��M�	!��焣�<���
�ʿq�����������xm���	Gihf�h�j1�� !Z�]G���<A��U��a� �g�pppkx�<���g�D�N�ˁ�?,Ì�o s�:D�W��7�|$��`m����!E��� �t�������H�����U����x�ܨF�6�{�/��`����#�3'�[.Xx���+��Y�8U��u&����9@2J	��Ik67r�:$;�kB*���&f��s�`N�f2�g(��h�HXդEke�y����W�m���Հ�!P��;��tA��g�R�u�X�fa������C�#�7��c�W�~��2�t�ˋ=Z L�Pؗ8���B4IAg������&L�Q��z�;��b�Bs���Ae���i��cz̋k���e��7���CC*R�`���ifa���l/����f��Y=�9��ŀU)�n۰£>��uP��Tel��Df���B'�	�� �C.��3����xv��XcA�pJ.��`9����^��Z�å>��I��B�eLhc�!�������0*mt�77[C�1�a(,#o��&F=f�"�u-ޭ\s�]8�ݏ��sn�=q%�^��P�nCy.	�B-NП�5Z:M�Gn(�<H��w@����D�#�F�z��E����qv���4b�k �+�I��v��?�@J��3'�腥�>4^Pi�#@��~� ���
}�L+%~�%$}�g`s�;�^2���L�w�Y��;��}�t��ӟ}��O���>�٧?���g�G�����?�����_~9��������������������5
�ݩd��3�*|�5�7�	��n�q�K$e����}��1_������g�U�z|�7�˷Ī|}������↍�>�W�~{w�rҸ�K~�y�k\�*e���ty��cmn���WV�-�j��7� ����κ Uh)\��Q/���_X�o�K[P`	�1ke�60Tn��'n�SӓZ���kP�D1�Z��#���t����f� ���pe��<([�����s����j`Zyv��AsWk�썅��@�l�G�i_�5��Ve�a]5���u����|�{�0�np�ź�/��_�@"1?�T�Â�>���� ��@�8��ӡ�!B��"�!��34�Drp ܞ�^�f�V�~���a*�a��kl����pAB�-j�5ª۾�����
{Y�_HQ�Y6zu�� ������;�V"
W�j(Ϣ�ް�C��Kus5 �G֑�2����4�`p p�}p�1ܼ?+}>P��@*��+���`��%_8��0�p H3W��	��xK�Qi7 s|f2��U�0wD���
��%�$�R"C�SF��X�@c;8~�s���B��tT
�x9Ba.�ʇLW����1G���cՆ颌���P�6�,�xY��>�9�?0ו��ǻ&���7��n�v\�4�"[c8<����N??������+EП�ޟ�ޟ�oAFzFzFzFzFzFzFzFz��Dz��Z�����_|�O��It>��_�y^r#��J����/�?cH����!+2���8���|}������Lt~3���˼|�����7��/Ntʁδ��&b�~Ht�=� w��L�]鋘���G��Z6�[�q�}�|�����$@��O�Cc���#�H�4l+ U¿fp6ĩ�|�@��}�u�:���#r^17�%9P@1Pa
&�	��i����������yN�/�/�B/c��uF���nu��:c]�̽�����=������Łݟ%=�p�q��4�t3��'3g� [�� �.6�=W���q_-Q�M��    �3�٥���>e�o�*;��08�{&��;��ցΥB�$�E���m!���Y�`�XG8����N����\�+\,nn�cC��glF*�� f0lϲ���J%���K*^ 0<ޱ��ãQ@�Fo\�0�L��9��u�,J���!~;�Oh@!���������xNб����j YAtu�8������=ȿhWzga�uj�sqC�Qu���Z�+���.E.�����8g��-i.���ThC�f�"��0����o4F�ׁx�Q�4,ă���n�⺍B����YFR��Q�;E}>?k��Z$r�6���� Ƴ s�C��U��	�ƀ-�]Z�#��<Q�����k��6W�	��6*�H��Ds0
} <fE~f�9!�sxR���'4�<�#�	O� ���������"�3�W@��ń��_�P��<xf�묌߁��G�������˾~������_�����E4�����z���6}�r
� y0��KC�.�Wڕ����u���_������gN��z|�7��ߜ�oI�������G����nm�6�"����<u���Eja�~ �����x���o��1�sa���]��8�
'pkF[� ���8�l���٨������Gnv���8Ű w�<��߁������K8|�#fS�q+�wpy�,<���iNƵ�A��{A��=G���tM��}u��\u��`�s	��@�{T�$gw@�{� �;��.�x�L�Xò(�����h��<��M, MsM�˺'���v Ki�*��Uu3�4��t.�k��9��nn?����_���?���������\�O��	s>a�'��+�9F�?[� �p��܆�wC�H�7��w�`�o���U��7��g�9�=��7��y�6�����}��ߺ�_�`��s�W��~�qY�*�ӐL���c���f9O�uq�a�0�a�q#,�]I��v]�ʘ�Uǘ���*V�'�*�xhGMw�S&��w����H�q�'я������n>9��Ȃ,�ej�ɛ�چ�V �ٌO�T����q6���\��s� ��B���q�S�� <Fm�B�jybE�XRom��P�s�r�4���(���)1�%�y�C��ѽO۽`�5ʽ�]��Vأ�Ng�4N_�g�`9��I#���@V� *�ĈF������y��zXH�7�����sb	�XH%Z��S�V�5:�V�(��P��-_&��v`vw�I;a����e�|�b��;�ܯ= �a�}E�9�ˮ`������[�r��{�ywrC���p�������O��	�>��'P�+j�L��a����e��%\��Ͼ�^��M��P���w�f����3����;���5/�Ծ��� ��}��@�2j7��j�k�������.�l_�
�Ӡ��U��W|�pın��$$z��6�v�����o'�v:���!�K�g�Q����{ʛ{��࡟M��4�]k��U xc�4��s���;E0V� �ub�&&��\��)#9AT���
!!����`�{�`�ZM��&��待�3���z�Zy{��1�	Fa�#���t߮�˹3�Y��ۘV+�
EAPYO=�����ď7"s$f��F�5>0M�F)��x��(�p>3�u�Tg����0�X�mB����z6y{1k	��R�3�n�O	ǽ�\,��<�O2z�_�X���JO��fi��H�-���^{��j^����Y�d��s����Y������O~�߿�������۟�a��5B��w���ڣ�ϋՇ�@=%��|�T{�B�,�8 y��,T�����[G
M�zBM���<�Ff6�8=U�9ZFCW�WH���1h��d1pVr�gM 2RR�>(�:c �.�e~8ש���1���0GH(.��ˍ��X�ne*j���,J1&Huy���pm�#FaK�X\�����]�"
� OEd�g���ƬX7\��\���eKr$v{u\��[W��+�H��{hp��Z_��H�èP��ncޟ�����[����
����р�QE�?���Ȯ�FI����ㆊY�cy����F���P�ʌh�����O�n��8[/uw���8��_�j&�1*�<P��M\��S5�2�b�#���������<W�-�eQ�Z��;����Xh�w�_ �Vہ�����x��2�g`��1�H��η�"CLL�>�gx��fx�p���������L�S�t3�t��u���$k�o�z��7|�h���g�L��H����4��H�s���b?>{�/�+�us~�UP|ą"�C�Q0F��y66�,X= �9�S(p�1YX�p4�*����i�´�VmB�`�[yŀ��ฌ���� ��gҪ	�&8�a\S�{k�븐�ͻH��%���s�	�e�Д/�]�i�]��x%�Ч�7t���ښ�=�s��X�˸x~�]�Cv��5��B�n�,g3�Y��׎V�A�D� 3�u�B�H����tlG�B=�|��p���O��%W�3�:,\�L9ד��<��°����� Y2&Z�42lޙ2�jr�Y��Ѳ�����>/;
�nua,����UF�ZN���K�1[��k���7S#p��m|�Y)\ �M�8�9}�o^�d����U��aZ*�	`0�Oe��pdI��M׀��3���W��M��^��S��*a���S�oP�kt�*�gPU|<�?3�7���%Ǟ�
|��|a\�� fr�&P3�1�H[�ӹ�( _mǌP�K��_�Qbh��*Z9���Q�dA" �Nɚ�Iaj��k�ޜm�PWW��e
�=��g8͒_m��źu5L�ye����`ݏU�p�=�#�6���&n�mֱv$���d��b�J��.:Z�ꀘ�s S����d�ZS�[K
�ۯ�V�b�܊I� ������qZ>q)&�C]skhA�zA�1G�$�1�������wsu�k���м���D��<7bcRMk�[�]xޔ�ta.V.9u�c���)Kr��e�6�)��},PR���ఉ5,����!�~����уR�&֧Z�����=���{���۬4�#�;�ofX��x�N#���[K��+ ly`"��j��A�(�!��qa��#o.6H��7�O����+o�U|+c���x��Uv_7^�긌��J_����UbR�e��G�;d;_؊�B�z5o��³����}PG�fg��F&���[�<�or�eY8���sk��Z��>�G1�]��ob�yeF��*�fz���[ʥN��-��&�������܉)ˋɺ织��	c��&|���#��s���9L�aH}b�؞�@CH	���0�P�5��H���-2�/j�Z��ďf�����i�ܭ���(C5AM�-e�$��[0��."���B�.��c'T�w��Xtp?����,<fp�<s�f�4
/���Y�u��!�� F��lRhK,h���R��Զ��m����A���`"�m�-L�����bh"ֹ.y��SS��uq�Ρow��xiC��\�}1=k�Ř�����2�L$=��a�!��>�`� �Y��s�Ұc�Ԫ��,��]:�nXYlꊝ�K7�t�丑�{��>������w;����<���]�v��{n0���& ���8f����\;�����@���F)����k�j\i�ɀ��Z���ar;\3f�����(�l� B�L�Ġ������\!g` F
]�`��LP)8������
o�[���Ni���]�������V��bN,ob80q&�?H�0�$T�De��9�1epHR* �QS�D�a��C���$�#R��y��c��ot��,��5Q܍ҳ��?�� R�G��A1:�T�{��� L��f"%�Q�Xe�aȞ()�i��1���ĞE�G�*�G����ln�-=����GY�r�ֳ��yKn�U��16���z�w>kcO�4�f�r    K���)4T \����`cH���Fs(ai�`����F��Y�[��5@W�O�;0
���2n��j�s�nLda�5"��H/`5Y$�Z�p�	>m����� �6�,vO�]f��#nj�V�V���K�t�t�����l�6���~#���/��6>��H�[a�g\?xvMo���lE[L�, '��F/Lz5#؉��5�﷬�������٥�
���<���p�p���G��c@X6l��+q�����W7� }8���^y�_]�A�A��-2/��2�,K�b.Tr-�rh\��T��"�|�]��`�<�Ļ�#�Y�X�E`���˥�U��
��@:ӷ�7��[j��� ·��wi3��v}��.����$Xi젏�ϸ�ёB$U����'l�<�U��"�f1�f.�J�y/y+c�F�a�����L!��@����Y]�-�TlT��b�p�I��_���,6ja�9V�B:�PVg7��}�����2�V������u�V`]0M���5���u�'�Х<g4s�	�E��xK����cES����g,��E��k>�|�]����^50����R���[�@��&`o����c�1gօ��/�!��������n�4��	kR��]�)���I�F�X&7kT�ut%�Y
bg�f�*ֱo�(��@<%T����$w/&Ɯ4��̓��=T�Ŕ#Pw�\O<h`�O����Ǣ���q�}�+�߳�/m����ق�czҹ�8����'���������K�ޓ��k���-o�^<��9��o� �'���q�l����� ���y��\��>i�_
󘱚� �˂�'��|O�u�L��ڌV���{Nx��'�_߷|�}������=o�?����y����z�z��q���5hC��'_@��vbm�X��X��g���,�.t�D�)�k���P��s˶.�" &���E�J)[��//�d4��OD ��_8\WO��3� N�0����㸀���s�#����฀�[zsʁk�z.�=�������x2����_�q_�k�����*$Ӆ�w�n�#lK��&=��*ȼ������:`yp˦���L�~7!a�]~��;�	���Ǽo�y\<��D��f���V��U�lxPZG�q��d2�1�`p �D&{(Lm�<�Ӊ�t�� �,���S7͔��������V�3����(J���� ��m���0�|�(桠��%��� �ŭN�0s�ww�
�~ N�4��@N8|�o_�Kz�}�%:�s����c�[HyC�Ht�؝zjt��;��T@_<G`dA�+�6�t�S�Uh\��e�Lu]eL��!`p�Xx�}y��O���=i�n'�$��QkȻz�
��@�o��,7�.� !���8.T�{���=�5<�����?���:���dn ����Z\aDppw���Kr��f1�^-Y������B������at �D�i�9�qC��t��cI�[V�/7��u͹�{@�h�� ۺ]E�t�S/P,cdy�cn>cv��jߋѰ���d��Oiu�C�5͠ciK��9J�R�'a���=tpZ*�m�����EP��-Y�jJ�5�q�e��B��p.�S�u�&̪��1S��&Dw5hKQL�P ��U��[��ȇ��)i]X�aЉ��X�{�q���ĭ��^Њa��,@JӢ��}Z~7R�݄�������n��B����W�p���1~5c�3�rN�4D���|�!�h&�����7�t��4��'�_�?��i������t������ߌ�����w�-�#ٳ���c]�>4:G|S���q����'�! �B�0�9��^�e��ȍ�ok/�wC���K%>g�`M���U�=�X,�GAnXt^/���܍E��zEE��T���m�8=Y;�Oh5-���GyvH�;u��rc�޹��#x��a���1�����\O�8*��Αߧ7��Ȋ�<t&�|`#?҅Y���=+O(_�F���aLF~�^v�Y��ҟ�pg�1ֱ+�{z���: R��Gt�ɵz� ����t�����o��Dߍ#�� ]O����cy�6vP��2}O6y��ؗ7�d�8 �Ơ�KΕ11n
c�v��C��aSl�32�>Cː�,IaIbu��?t�	��76��fK,M�6r�e�>�QE��1F�k\�S��om>�~C��[�3�go�m�Q?�Je�pE����PB$�C�+	��%X��6`�Fv8���-�����{ "������J덽{�ӄɻ�dۚ����4?{�����J�>��J�ڮ�7 �8=2��jW�ae�b*��`�p�H�[�o4�dCږi�% ��Ŋ� ��׵y����V���7@	�5<m�~����D��=��Eъ}��y�9���!$q�aCO����s6Ku~�B?���"Z���yc���vf���0n-ອ��,X!����ƚ�7��S|c@��ƀ`�غI�<rŊ�DKeg�2aY>�
l"�� {�}�۝"��eH�ƀ�ƀ��/c@���%$���"���ѯc@�	+��f?��[Ģ/����
�K�"|Vu{L8��u�;���lm{ K1l8�z�߼�Cb�xj��8M��iz�V����ҨY@�j��?� R�NM�[BAo������h�[�k�lp�n��,�?pDȆ�>7�k�Sj*��1ކ�/�{���X8�P�eh�3�[1 ���|��^c0$� 8�壿�t�<��L�m�!�(:�f��hqZ����0�iE:&h5 @�7+�N�H���o8���x��Xd-0�����@Q�nz/l |���b���d���OO��U����k~,{���(#�v��w7��݁�����˿Ā�،�@{@.�wE��`aH�@Zpvu[��\-�ͱҹ�+l���L*���`a�b7,c@� ֟.�0��fHh��x���zheZ��K���CS7͜qP����6^�<��13Y��23=eY	)�Ur���ڞl�Jo����t~6�#?/[��!�i�uޮ*��| �s4/�m`�%v���������F�L_���<�^� 0,Ltc��c�8�7<�v������Y�:jvH��0;�ݸ��V�,�d�]cA���~v$|�G/F6l n�������'Mcx�[�R��KPKx��s_@�]� `"z����Ǽ(�1k�#a�]�ʱ�nl+y�����Q�N�q�Q���[�.tLz1��z�m���@�ffj�s���t��n��Aw�89D�x����
V;�!I�	Ys�i�(T����ߘt]:�3��@`0 �(-F���-���$&Z�j>�r��Xv#�|������<P�b�L�q�6��Z =�i�,�q��Ң��{���dⱼB_xR�p0ߞ�4�=&����} �	�f6]A��\B���4��W�9���� y=��0.��e'C�kY����x����2�7������S���S[q ���k�(X�h�M��2l� ��V��4+�Q9��މE���8X���κ$kYgD�0lcp��\8��e��iF�٬��lB�qln��L�Y-������lRzن�O���&Ne�F6����Q,y&�d��%�y�xcC�F��(�7���Hy�2G:8��X0ދ�ܱ������m�pw�Sû��-�W,a\c��'��2�/�ih�욟���I-���:߳]�lTo�b=�F��1��M��'z�kΠ�������e�t��f7���j���@{�4��"z�����щ�g4	�����.�8�1�����#��3�l��Q�}�x����)dG,�cs˒Z�'U�=����ӆ������k�[E��#ֻ�vub,9�RbWu��H�E��k�aS���5��M�U��ĦL��a�q��� �ȟ�g�~I3o4��N�UY`'Q�X�L7�a    2�&��Ж�l|�Q煇�VC�#�=3�a��P�b�K��Z-9���-y ˚��kp�J|O5�b��YCN�1���/��c�LO�-'@ڢ�b
����f�+�FU1��~�J�ܩ5ڮQ�zv���zk���S�V�6Յ!u�o�'7m�m�d��=�ڗŰ��ubvV^f6�*�{�8d̹U���0u���Y-�c܆����c\ �E|���b��*�����~M+�%�fw$�<p�d�)���~wz�ڬً��q|n�28�JZ��E%�.b@X�e�F�è ���6�h0$�9����Gy���rN@s��d��y��
����U��*��e}�0���]�Ś]bsW��Ԋ:C�\���<�v�'�F
��B�@��P�TxN�#%C��88܆w����[�����]�A�i-芟y�7(��d ЏQ	#�щ�6�����q	yg5�P�M|8^��i�i@x�{rУ�i��X2��y�Q6|{c�A{�3kEN�;���XT�Iu�7�[k��7�a���	��N��(hbs�h�T��2'�-SYRppEh�-_	pZ6�-����\j�g�g�4%G�t7��ވ����������<�v�ǒ���\؈	CGY����Q�Ը�?f��$�gm���!f�86���d�gcg�#*Cq�k�n�=,x�SWFW}VC�t��y{_3we2��!~�Ã<3��@���`��w��TL&	H h͑;�ژQ=���q��r��c��i�n����l7���|܎���Fv�{��ޭ�K����~�������������"�}���e��Ê��2�_��cs�{�րص��:lr���j�s?&�=�.���d���_w�<j�w�P�$���>e�Ǹ��n6�H6�x�]Ͳ(����uL�sIJ�� b;��(A��_�6|�6,!o��	ntX��-����M�����#6�1�c�b�@jLH�x��oM�E�����^��bb�Q.#��Xaջf_{k�t&EЀz���N�>m�z�l@��B�M�佡V���g�a}��l�������0�i@y_���<bg�.�j��{Z���͂C�f0H���z��ivM_����m@��^�Ѿ�K~dPKG}a,mÊo�=�@�qZ��:K,����&����3�� x��*��r�
�Bv_��D�����(�lbo3�ē��\��m0�m9�Ħ�J�a��mi�r �u�U�s�#b�%��������867Mx\�~�*����4�W33��8&r_Ã{Ɗ|&�@3���'`��?�c7����$�m�jX8�F7����£��`գ�;�a��M�a�&�@r�_�����V�ˑ�
�Z|�B]� �j�Ռɹܯ1�u�����\e�A��w�{3��R�s
���#�����ЃV6o�նoT��ڄ@- �l�����¬7ۛ<n+pG7k�?��=gE����'?�o?��������WZ����g���",EX����)��x;����zôގ�_��]�,�����W�M�'T�ߺ��W�R�i^����W���p߿x]�j�y󯃪_U��C�g0dͪ����sS����T�)?\������I8/EA1��S��/�1��tnv�����m�q�Y0?�=_6����-��l�Զ,J`�B�ըP��vjX�}e�VR0�� ��v�� "ϣCeL���P�`�ky�=��y�e���p�-uH=2��[�L `�H=×r���C�ܡ � ������@\���z׸�����3{��
ö�^�_��4�=0�c�9��-���4/%Y�
2��P]��E��O�=̆�D60���������%��,�K�B���tͩ���ƚi`�e`�|L�2�BPg0+$���f���>�u��d��r�o��>��g�d;���.��}�u��o)�v'x��A6����s/>��&l����5܈t��6�춌�5�g���H'�݇����DKE�}+��.�L$���5����bҗ�������e��B��:~�u�>!���������͌
���u��o
�Z�����:/�y�Λ���⾺o��������j|���21��o�����adX�	ŏ��PҿF�^P�dO�b�lxK('k��Bb}3(`�e$iJ��4	s�7 �m~Æ�!5�j!��0Z�T���A�{�XTO���,>�5�(�L��0|�y5�[��G�
&@j�i�����+���6�J�)T�~n���G1e�����z�0ċ�^ؗ�y���܋ad�Wlv��aF��k��!*X�3� 5<�7�5�b &�ۉm��X:�c�$@�o�|6ew7���g\/�m<��ո�=y̾��3�sdP�),�w���*�Ƚ��)�X�,��mfe�6�aי\�Z�Yg{a��Џ�z0��Оl��MI����쮿���=q�ױ���F����Rs���'!���%�͆I�4 k�ܹ"/�h{�7����2��&�y�����A��b�&�G�;�q#����֢��0����������_�W
?w?w?�����(*�_�o��Ѥ���_v�l^�2�szk���e}���(~u�����Ͻ�����7��7�(~u�����C�We�S�k������o��tce�p ����d[�Vk�p�5Z�����9�	���%� �B�V��֒4bo0�5,q,U��N��N��	h�=k4Ѩ���5s���l���)����fr�1/�c�Q�a���_JZ����gzh���m��X�	�q<�|nQ�]�|6��]��F2�a��s��a�5���e�i$n��cN�2k'Y��*s��l���U`-��6s�`od���j�}��"K#�U[)��?�6r�����[7ǽ��j���{���y7�H�es�^O20��XN1���SH:  }�s�#Z,�60�m�[�l�vgv���ã�u��S���圃ŕfU�X�$^���f�s�.N4��=���eC�>�9��،ȸk��Xꧽ����D=�<��E���mAia^Ӗ�V^�������TasU��fŞ�~l쌶m֛����w���b�4��[�2���;�q4��l-n���(�S�jBv�ڛ�,�uW��[�7#�B�>�G�*�CX}�},���,��8S�x$+��kÉ�r�����~{Ҕ�6���1*�[|��{�f a9���Uƒ<���{�l�w��;%�e7���W@n��S�oq��͢ZOz��aS���2<���-q�����b�@d�Ya�7�Z�/q�[;�#@��t���Q��}d$~'c'�8�7i:q�4M&��c[�8�#cK�:�U;�a�L�2bF�$���oqzt6��O�^ߕ�d�kp�ΰ�5.�d��k�P�2w�u�M���x�s�0Ӛ�-����6��(֓�S�q{��njs�ylyy�Po�Ŵ�c���źl��t%��R_0%o%";�(fU���֡�C$�����{��������W������?����w?��'���=�����UО?E͝o�������V��|ٕ��]���>�����Q���7釴�l�`�!���t��E��4�������{�h��ޢ�6�K@����k��ieW�g�h�Mj+YyR�͏1�����B3�����z��G[p�dQ�D�f �A�W�f��C�������L��vP�,в��#��8f ��qYI�j�2@���ރyPm���:\�$�,�B,�.�뛦i�"h��d��޷�[�� h/6���&L�,V :����X�Z��fֳK0��m�F�L[l;��0���	��v�4Gr�̅v�?�m.�}��h�d���cᘯ�X�Z`w���.	77ﱡI��-8 �?�h{~Ko1Z�Xd9l�FT� ��rtޱ��"6���<�	o�V�B�s�6��1PY:�Lx�}�"cj@!$��K����>"~k� d�A<��� ���2��a�@��    J���U��5�F�X�e1F�lv-c
�ei�"3�7�mX���hq��$��I/�ҡ�H�:�v���{���1
SS�h�]�h):�&?8���4�V{���z��|T�za�����=@��MB�&���b>/2���_��A��ԁ�w+6���pB�1���=H��\=�'�s�j�i��"��M�(���:W�Ξ�Xͼb$~{B�S:RjH��2P�L6 �"�3�VZE<l��@�zs�v�yHϗ���������O�	�?A�'��� ����O�7�����?�������������������'�9��������"T������������������Hj?��6�/k��w?�����^?����Z)�gN�gN�'��۠<Ҝ\�~����O�=?r@��<�߂!��Y^�wz; ���)ܿK���߾�o�����=?_��y������p߿8���+����aw4{�'{O�Yp���Zt����(��भ<���p@ц8��)D9� ֌��-_��&�9�I���p��v����aX�{�a��{�4��-�38����ۖ��H	�����i#�=�����n/q�Z�� :���ܦMLH�oK(� p؝�Vl�2s�t&�O���fOA��
�]t��^�-B��'�勷���4��^{���R�f}=�P`!���-�����=T�^W��q����|�`���8�<Y��x��ږ��Rz�-��m"!��m���npR��]��>��� I ����n|_@��[F�
of�X`���gN�����s��9��ݩYΔk6&�6&,�׫�׷�7�>������cxlr{./;�OL�=�m�w�;F�e6ۛ?v#k�A������B#���.IQ���-[\��O���޳�g�`z멚y�rO�� �d'�����^@���^�%kWd3�Ǟ�ɚ�-]��-��YX,�٪���Y��:�A�eC>ۑ�<�-�v#��pyLܐx��CM� u�����E��[w\n�od�*²�m�78�������C��1v�	62>�VE�v/tlU�ն}�{<�~�e��������k�ְЋ��6� Ў׏������j��������ۿ��?��O�C�u�/�wZ��(�g^݉k}�~��i�|HR^�o�49�ꀉl����w!d�[�\-���S+x�#��mćt�kq�n�ŝ�n<�U;a�b�6!bz7&Vi���n��BO�
z�����o�m�ۣ��^�z��`?���NG���Ƿ����o(3FUP�e�-����#�\k��e2�uh3H�Ϧ�Zd0yO�oa�� f皖s=k�
��B�c(c������j�)=�¤���,A�i�OV�`��e%�@B��M�����/۞�-��Y��m��'>6w��ǾZ�`%p1�]�B�Mm�G�{���[;\�BezF5O_��Ø�t`��ul�U��}-ƈvo�����e�7��b����[(��3�ӬqU��VYVM��"�]��ֿ������rݮ���x���Q�c�CZ�< u6ȫq[�]��`�ɖ߬��+���_,��T��J�\n@�͠��S*�[�lӛk�'�?v~l�&��z�� f������핈�h��[���9ج��KU���5�=� I�:'���u��#
�6=�9���W���[FE�D:��Ѓ7�֫}��ų�l�8 ���VL�W_9�`;�������~��6l����:˸��.���X��"�>���V�6ޕ�h�*��&��_߸��0��('��+e�N�cw�l���r�[��b@^I�oArŸg
�s���"��j��I�y� Ъ1�40A�r���Y ��Qx�(k\v�lᩨ�%�Qy �gσ\�:������Er�iV�u��v7���M@�{r��&�*�P�/]���3��k'n�:n��)���A����o�x��/��V ��qbZ��sh.u�w��da�pxX�����x^��Ͳ�⅊�I���,�PXQClP��[G�=:��m���I��v��b;����4s�Y���q��4R!�Ŷq�e��6�����Vi��ߛ�Y��os����s��g��������������������=����w��/��������Z���d:��`��
/�y�
���t�!����������uy�m���t�ǿ�|���G���a�3�I�ٕ�*����V���ʶ��M��W����޶4s������������ٿ_��y��c�����qփo���e���<@�����}����L`c�7#��-_�}8J��uV��ö�ځǸ��l�W���)<��'�̿+>��T�ϩ��@)|���H�ASn�$<���z[�����ܖ�pll��?P�6;��Y�p�~�����Aו��^��Ʊ��%�m����� ��s��q�.5�����m����\=_����+h�3o�O�Z��m\�rM��}�F� �Vl�&�e`_xOl�m.c����p ��ia�u�l6���}��ωP��@�`Y�|f��Dw�1��Ov`x���N� �G(�A{����]�4�,�N<9E2c�~;���j=�k��J�8z&9/�=�DҮ��Ʊ��\F�l�w %S��a3`ݱ N�����ޓ�{�}�e���Lȶ�t�t�瘗x�^�
`?s�hv��f1`�C><m���Ԇ����6��:����XD�C���z��c؎v!?���Pn�r�W���Q��O3�!�IvL����G!-�n��U��`�O������co�� ��y��)�i���c0@�<ؔLV{\��t�ʘƼ��i(p�V8$xjn�^E�<�Eq�W#���:��Ro��]:�;}g��pD&+�զ�����_��cV �?]ֳ��4�j�"*�hH���\wBҙ�WҴ�m�K�$,ć� V�b������lv?]X����q�V�*k�[c�څeE�ݰ��¢m��p����Ӯǩ!��A�����?�E�;kQw���G���p��iu�+yA�b��9��k&9򌐹��ܽ#*��v���I�8`Y�	����-ä��oލ1pO邜�D�Y�vk�s[���9<�z���
?���s{��5 ���6Wk��}y�Z��'�	7��*;����a#]����SVY�0��ǽS�%*fl���jEFg26*)�[s"����Bk0I�m_���������(����)�W>1{��<�
](����g�%��5���Xy���������N���\Kڡ6g�MO;[�a�w������k�����?��/�ӟ�_~���! _�w�����6�G�F�뾨!�����o��EM���mj��n��7v�!r ���v��x�����0�n<x`�
�		������E���V����_v������#��˦;�m�C�o�r��$�~�<�-���lLg��=��ָ��1����o;pWwG����N)6������U�ܕ>�[]ވ7�T��A_��Tt˯�4}�!����o�;$�s�u�-ʍϳ�r�e�^�8���cE���N��Ns�������ˀ����/��ˮX�ٶs�|��^��c6������p�r�#3@�G�E8������ �Kc�,���q�X^���q�����U.������������g��NTSk^������1h��Tk#��� C��,�G��%��n���a��'\p�:�E�^6
#��{�����/��a�
׸v�mD�rm�r ��6�3{���;���p�W�:�� q�ЅsL!��V���rU�� �d@1�위t�a�1���r�r���Q�U�E2"�&�.\�M�|��g��P~�R����D���"5�m.П�\ �{NPE4����.Fa�^g>�=�a����`�X�r��@0q� Ceb3�ʋW��8�^`)�F(O7X� 1�y�4 �׸����CNX��i��u��ކ    !�g=�R�������m�L�9���}�mT�l՝q;ADkc�i��_|
��A��]�&�E�Z����b�@��A���
�n�!��4�le/gcmnw� 	��=a2,C��B��O������:�[��9���r{�TeI�|р�;c�B�s�z),��x�<��Ւ'���>�Ӆ@lR��wv�2���#�;D�q�6�~�sF��	����(���$��	�px�7�c#K���{��|K(��)H���=�؎�xw�'{�r�ۑ���x�����ǚ
Dҭd1��k�Z��P^l']���򢄳�<�.2�� ���,ـi2m,Oz�0�XC�v��h�Q�cR����` j1?�-N�"^P�l>����^Ő���F�� �i:e|c΂�g>\*�@k�H\�OOR��m��o\��9���2�2��㿎Ṡ@��l��N��d���2�̻�p��.����u8�]����؆�.l4�ɫ�@O�&k4q���hק�`́��C~����L;X�
��᤭� |u[��6�ڛ(����{�����0�k4��ńt�3=g�LV�+h73=eY�%{�CN�e�
��Ė��"���a�".go�cx`��g^�b��[�q:4g�%��l�i�J.�m`���A:�qb��5Y����#��"/���>�h�6ê��� U�բ�=��T�a��'v幱���X�`�=�a�\�i���;\���AS�����:�X�#�@���I(�J�r��	-�F 0
n��Wo�c㘵7�)	I�.�ɱtc�'�q3(�`<v9��18
�~k3Ǥ#C@.�"N*�:�!�
6)~p���#_8�m��bM`�=#R~�nQ�n����l���}� ��b�3�`�G(0~(!H|m�(�t�RMv�du�����#A���<�fo��}����:��	W����a�4�,p���n��n�WiQE�={�����;��:�)e��6�5�g�Q��( ���f�:�N�q�Λ��|�7��9�ҧ�n,W�Q1�,H]g܈�eO��c�]n3'�;�7����mn�l47�[<�9p횦��e@l:H !�o��V��4C.���`z������	Y0�a,c/���w���8�`�1#�[:�~ ��%#��Z]��ss[z]���=�+#0ub��ֹJo�#�h����Q,�$�d��%� �z�f��C�e�H�<��y��\�0{�#c�x�c��x����n��U�w�?5�[xQ-��Rb�3q���m,p>�Ep�2� ��0�x�v!=����1u�	�ρ�f���eW�@�=J0h!!�*�ϥbw0��Wg�Щ[��NЈ�t�~������UP2'sc�F�P�[څ� ��uU(��d��,��)Y��|����)dG,�c�o��Z�'r�L�\�_[d* bb���4��)MG�wq�����RbWu>��)X�����q�}ޭatws��Ħ��x�dbn�SM�?7�)���f~��6V�va~<��N��@ZH��˅��-O���5��^�G<{�ǽ��fԿ@J����n�Y�dh�������j{��f�}�ňf:`��*���s����oX���Њo O,a��k�Q���|�JQ�X*c�5[�O[D��[����"2U�o���t��!����F�a5�I�JOׁ�ubvV^�~}U�l��!cέֆ�T$��S�����D4j�3���;�]Kn*�>����r�������⫐�DJx�������@BK�Dh+����g者�eN{�e��g^�]M|�cg��t$<m12V���a+�i���%�;pr�u��|Z�6�N'k3gB����	Z��`0Ǽ�%*n��ōP��p<Ǽ]G��B��;�D0�xӿ�(�r3a:&���Xr�	��6fߠ C��,v�m2E�ݭ�êB����Ʉq&��i2�!�nOF>���Ky��WaS �C�����\�g�y��˘k6�-�" q�����6DN�<�:��A8�{�
��g�0�i-�r��  \�&��#z_#Xb�E�� B��I&0�>")Bƫ�L������Г���Z�M��O{�n:�Gݐ�c�䗓������j�S
���/�4�^�K!���Ä�V�:!�G�����i�ws���� W�6ɶy �I�Q��U���'\j�g���H��Aqw~�p{�'q����y8-��ؽQ\x_O����\D�n������?Lz_�8}y�Pjw�-%��q������J�f4r5FQ���L���j�:ba�M4c���2�������فG�U\OMX��7d�3�Ak��^��w�|�Mc@x޽�U�¶\l쉸Y����+��U�=�F�|�$!��:�����Q���m��2�g��� heW�U��o_�>ڕ�&;B�]8�M�-��0A�هPO�jGI\�����eˑ���H�;Ñ `*�e�֐�F��c9����U�w�㕟E�&�o�.�X�(�\�7&�Ð3�_�7�Jv��J�ʾ�E�D=6�2�A��7�^��P�t8��&B�N+?�'�2���*���G�ЧO+IB�@�e4�f�Νܪ�գ$?�`ZG�[����]��Nܿ�s�7��C^�-�y6�1�a Ϊ�;����ZI]�����<�p�[���#q�A����$�+�s�\곝�m����q0<.�g� �sS4˃p;�c�f`'����%W9�	¸������o�tT��n<n&���+�"���� �����2$>Tqj2�;�����h �󕆧�"ɻƸ���d_�R�.��%h�=�6>�v̡��
b~��^�f��$��XЂ$�a퀌�ǉOLՀS�@�K�"��ڃ�s�]�|v��}�ځ=8��/��b�(1�����it2�� �B>�}l�sJ�����K[�{�}e�R�;a��t�ΐdbg9�|l����ئ�����6�C��P�<������r/]�U�gux_n��,�]@���1ŧ�W%C���*%�^��ٌ�NXp/��V�L��מx(�˗��Ψm=����J�a���e����0,�U�{`�~����0�9��W��Kn����/��Kn����/��Kn����/��Kn��)7L���_W�˗����?}�ǟ��t�n��n�/���g~�����"�����A�P_{�`y8���Qm���R�������~�-�����y߿�_y����˧��������o�c�ۆhv|4�Х����~���9��X{��<���G�W�,&����'L�h����+��vϱu{��XC�[��Ԇ���V��R�w��6cm�̾B�۾�ý�jw��m�W�e��m;#�(e��h����)�ce(�c��fÂ⥚����G�9d�������*s��L#�w�9�d�.�M�J�*���PBD�uڶ@� U�J���s��e$zZ�@� !\��|Ή����h߬P�#����z��P>�#�h����p�t�������{�ɖ�筼`\ �G(T�`/P
a� tGjS>���*NԾ&<kT�����bFnP'p �׎�2�v)��\�6S���T'���2��M�A�}4H�^���e�v���*	���JS��T�@����8D�	��L��q�o۲����X;�M)���'Wk��m1����� m�4f�]l�ɛ]��3l�ێ�p�R���ߏ%�;���{�����7���|���|�ɟ��߼��f������t��8%�o�
�M�\�>?O~xݏN���~f<���}���q�<��u?:�G\�'ǓVx������w�d�A�&yMm���,s�#����=�tZ]�\�;�K	I�{;[#s^��cYt������y�juޭ��p����b��UtV詎b:<���b�*���Q�T��G���KK'V$	�*������6vυ�	���M�������� �  ����_}���}���N�۟
>]��c�^��Լ�)�R#Smy?
b�s�mj>S�v��m�����!�>T��N�������Χ���|�Pγ�"��!Mc\��&t�)�����`t�y�{fs��Gk��R�n���<�������ۅ�}�^7p~`����}� �O���4��"���z
�x��=�;��''Y��&��l����xo��>�;+�� =�:��r��Ol���=[���*x�0i�P���,�)���4��k�	nW�O;�R~t�@_�s�����8T˒?��ۃ.R���Nn�4y^p���G�f����H��Wq�l�V��WCu��'v��7��1`X�i]in���8���]�S`	8-��%�n��f���щ]�r�s����-�Z-B���F��P+�m������/����CЉ
.�z�%�q��Ֆ!oO��e���y��2	���t-�o�^{Z	 ح�vK�_��4M��%"�����o� �ơ6c`=���8�:������m�p�dk����C�
� 5�n�(��|�k�n!Y81�&�F�go3���U�B����U	��vLh��]_�<�,����A���Hy"�u+�Eb+3��}H1�Rμ��ʳ�Ŀf�bL ��H$X?��Kt߲���U�8�Y�4D��;��Т�.U��0�Y�n"��$r�A`�T���B�q�ֲߢ[4��lcߺ��B�����,=#4fG���4T[���0�a-����[2��ycI\��a�\jo�i%5�����F�ٺ�n�cU<��D��T��ccE͖��f���p�������O>Z�n������|O�����3�q��խ#��Jm�σ��_�m<���:�/�loGwm�+*�͒�n�W���;1��<=#sO�?&�?��/��;m�s      f      x��۲�6�.|�~
�/:��������Ҳ��In����$H �8���o���1�f.��}31��'��j�*���V�O13�kU�@�L$��L8�����_X_^�~������=���W!K2�[f�1h�x`>n<k�[�z��z
hf1j	ɁD�aH̨8S��FZ���}���O�_|���4E�5�S�,��$�jS=�iaș� 8f�z9Soq��/����4֫��շ��aj�;z�P��e����z�f����q�(Դ �FF�g j�<G��k;ѹ㞻�e�_ض��|�5��O��/��J)[����8�gmʦ5�K�e�/C���˱*�a�I.w�_Tm���h�{1�mؐ�hb�[��P�=�!Տ㈆�������ά�$H�4�@A�D�ם���i˜����}$�����oy%��aǦ�A��;gnIh �K�B�%�CA���$����"�r,e���ǔ�Ы���MD��c&auK�@���cɨ|>�qx�@R6��˃6�	C&'o����dn��Ě�6"�PxKH
`�2����_���e:	�.�E�{�V;%i��h�M�K[HE�z�h|M(��i|03 �k2�?�"T�R�IB׎cQK8����$������������Ijj4���$)ɖ�;RU��qo�H3fu-%��t����\�$��0,���6H�Z�V��k�X^��r�T�¨�+i�����؎�Xfd	Z쏗����U_��(��fj�����ș��š鎸?>���3�i�1��Lt0h�҆E.���;�.I��[7n��^U��ԶS�]1hX�qE�������T�v��+X��yG>�A}�P1�Q�ʸ�3oA%	�^Qze��� `?�]*��P����-�X!Fۥ�S_T�QL
�d��I��Lh�
24F��!�7��B-���l�a�[���,�ex@�;���H'u`gxΦpƮ�"�<�뙾KEx*��[j�s���U�T7����q�~)X�K퇴#��'!4��/ ��]*��P��iSt���/���KtR�(��:��Q�>�!�U�1ÝiA�d�R߅�a��Hy��C�[&�����3sE-�P�vI�Fω�q�4�/�`Í�H���s��?%��]�+;u����Tȼt��ұ#���y�f[8uf��2�h1�R���~Cx�.t�9�Ib\�.�}�t��Бʪw�u�c�	���0]ft+�i8٠ùy���OQ�On�}��@�K�=����+���YT��0p�f�Ӗĝ���t�wZ�$�#�9���v�j�v.�C�괣��I����v�#�D�aD�,t�I�6u�R`�b�c��%�t��ľ\F'F)�2�m� �c�MG�g�Em�A�"���G��҂���4�/�CU��t���v�4�|J�$W�3P��/ۈv��Iג!)�Ćy*��;��X�t���X�4T����%f��j�J#A]M���wҶu��X���Th�3g��1��6p�̯���4e1I��������bNq�Źwҷ3�ֶS�X���9��Ρ­���)�8�fRL��M�ZI�i�(�:�qS�ӂ���e%�\:�*�_��(p��霄���kP��ip�l�sOԹ9q1�u�8K�v>��CV\��:׏�`�ԏ^4�N��6+5�a�E5{�2�ޠ�����H���lWp�1mA��_:#J��;N�LyF��yd�)+�:M5i�Ș_g�Ƥ��jۓ�?�HK��!��MDfL\��s�6r(�u\�ә=��2�
�WǛj2a�{*�su�e�ۖ���\zX�YSu��=�� :SDK]��ˌ��fc�M(��8�X���E�޳����C�P|x�;�T��nQ��ffM�Ni��f.&uH��WƠ�1'�kZ,JMf�r�g��8H}���'�~%�TbI�P_倈U��]q�b�vk��4���	��|���d���MKp�Qf=,�'%���'��+�(|g����cěO9�j�7����}˶������S.��ן���%����'�O)&�9Ȱ�����仚LO��h/+�������z����(���3Z�����Gg��/^�Y��{��'����.w?�����.�Ov��g��|�o�O��ME�w����M����%TgeD������1!�ZNf��8Cj��!��1D���z����3k,1,-��s�f��z-n[W��j1/V�ߦ�E��wL�ŪV�sX� & %��|����)ajZ��( ��l�1\�/���w����_�H�������5�b5����Jnޣ�U@���r���+���]��%�������F�'��������[�f�,�z�ڧάǈ"�F����õ��]��kz�p)U����e���?����Q�tc!iA�,��S,��1Us,,��?��7I��t�������{�ui]={d}��y����b}���<zr�(��qE���?XIh[��/w��R]��,/2��9h�˱�{y�LE����_�Պ���5!\��g�"�ٸ�%�;'�o�6n���=�}�.�o���� �����L��7�q��N�u����8�� �	��
b��&�	O��`{����?���!0뛗W_�~��L�/�PY�;��R�R2�H�j5\�Lm#+�Li�5��Bs�P򍡖�E~�������j��{���(c�z�T'!�?��zAչ=x�a�Dx���Db��c+���ZI2�V,׵����Ok�?�xv�čj�c�Q�9h�巏�t'���ĔF�%mZ�Ts��jD_I��Z�Iv���g� �gjC@�e�'F�uO�9SME���Ս�Y���i��6�+��2���ݑѫP���3빥4�j|V+��1��z�,�����Q�{5� �?��?��� �DR���0��8sl@��:qB�h.�2�`��(@�|/г"���9]�f�'��I����Y���8t����'��$Y�kTRn�j�\���M�s���vC���ά�y�fE;��7q<WK���K�,���O������m<�\e�"Ee��$@��*�v<xQ�G�� I�� �]���� �ª����~�pܣ�@̲*"?J{Z,E�ј��,�b��>�i�%q9�Z���OO.�tl�����.�{'Ci��e6a' �����]��.?��[״���ԕa�C�A���d�:^ݠ�W3jOca/4�� %��~�um9SQ{��#�r�Mz�)���9m�.���P�4�X$���x�ڴ�����t�%������=�z��a�8хN��D5OQ7/S%���Vt�� e[�~!���Ttm��N���CP1˪�RzYV�����h�NR8 j�F0�i��U��mZ��=���)h}\�e��n wl:f dIW`�1-��֏ŵ�vn�P/#�S�9ͪ��,���2��v��C@��~��x���8�a�@�ΨðΓj!��A�C	Q��!��;��Y�'p
��啕��<%1�k�������C�Bړ�:��ädMG��qF}��	
;*�S�������_��qV�D�I9%�S8�8
���x���`�����'<��ѣ�_W�$�=���� �+[Y��RB.�uv���βb�����׶l%��A�;��n��lq!�y2ɸɂ�2yw�N��I�'1ZP��>WJD�sY�c̙�&In{U�	o�G���]8��K�1$!Ғq��	��uԁ�N)��'��i���n0R�;l��e>R:J��*��y������o�����ll�}|��Ns���'�������-�	�D�r��/�+�> ����+W����9P)3�\��v�A}V���A�.R��@�H���w���S�>7n�d���º^O���1,���uЏ�C�5bYZ��(3uԤ�n�-�'Z��=媦hŴ�K����L��K6��OX��K�1�WW�>��3�k̹{�FU/(�d�}���z`�{��4������z�J�!Zi@�V/�(A�;�fHHL�Y�{DV�    �"�`�����]�V��t��ӫ��__[߫����;��o�w�~Y��>��
t���R�L�7�a������f,l怛��D��{8[�Jƌq�q;���O��q��^|��z����F�h�֬R4Jqȓ`]���k�8*���(5�8�'�{�ku]�	/R͋���y'z`�p����g��)�#��`Q3�2,c���W�ak@����q_YϾ{���^��ZLF�p��]�XJ����z�!��o$c]�3X��Ʒߨ�V�p�+fU�-S�Ud@{�����Q��������Z��ͤ����W�ą�cq%��Y�B�z��������j����;a�(+��~�־�]'큾u�Z���m?������?���z��'p�C�^p�f}�9���Aupa��JmR��8�3�$שuVw����/�z�yfէ �i����8�??����;d�m��~H{R*bo��P��~P�nFc�U߶�K���d{��9�f���4O�_b�|55��~i��m,������?��PB�iq�?�i�k;��ψ�g`�����A��~�/nT�w��y(�3�W���7�oX��6�����C�=�՝��[w_�����u�����-Ѫ�
ά/��&"���W,7���	�fj�()�E�ʷfg����n�R��*P�A*�ąu����C���4B�]Ꭽ��X��p�_��_������˧W���}����W�]v��#�+�r5k�2����_n]kdX�nC��}{l��}G�s��-�D��|/�2��S�	���L����u�6��16Lg���H��0��z�����b�'�l����d��O�~`)�~�2k��l�z��s�3��-��_?pm�9��sǽ/��KXQ8��0���.u���D[�u�� &C�J�t����L�li�.Ki��(r�a��];ңM�#쓶�X�Q�%K�5��&��e���&� ��7ȶ*a���C��,�?,�I���(�xV�x���Cm�	�e��^I@�S��П�?$ʨn�`f!,����~� SA*hw��]"<��=4���?8dq��Y|��0xIWO�M��h�eA�}���&��k����Ǔ&x�m1BB�<�����w�ۓ��үH�x�`�,���_Y��W��g%LK��=���u=&[)�$S�"��?�؞ݩeŧz�a���.�������'�2Vr#��-������8(��R�iS�|�� 'sX��ʁ�b���-i�a#��?��LHMs���E�MZV���(2{��j]ןI�ަq �R�N$&m9	Fe{%�z%��YS%� R��� �æΣY$�!�;cwm���S� � �0����y�ҁ8��x�<9:��c��,��r��g�a�H�0�b17��UԤ�X3@7��� �@L��l�r��f��4p�49J�*�̎���a,����b��0}���8���:���m���&��8*�X�d�([����'2Ȧt��C�ɩJ�B�h���OZ�І�Q��������ڭƮ������i{R��i�g�6]t�LEJ�r�{k��4}�������4jH�e<����[�q��Tql�j���6��g��zC;����[���ĕ���;�I0gV�%��wu0[7dcu��Y:U��ɩ���#�ϧe8N�
�4�r�Zbhc�:����[)C���)�YB�wx�{I碇�YU��ܥ��8qV�Ya�N�"�2�N%'�+ϱs��șT��qr�ﱌG��fr�о��4�����9U�3�5�����I�E�c�iHĒ.>vY�)�p�z�sN�ȝ������+��D��Za�62J�*#Θ�Ʌ��p�ӫ@���-h)38b����8�j���*թLD���]�G�}8��ΓS����w3t�c4��qU2��-��b��@�%f�w}oC��U���I��:�Q�/��{�����	r�,�'P��q����!���,<mYB�&����tur�dP���U�t�����-H��l�仄7�9^l{
Q�{�zv�\��!̺0���)Մ�.s� @pb#V��
c>�]թg@���~���B��X�E��
���8�B{��.���4s�yQ\�����O�q��P���ĭA�s��[.y��[Y�wF�#�����2y�ES�Gy���vV8#K� gvK ��X�c�xV,�F�� ���oVc�Me#F> �x�2��B��r{�:q���ڟ�ٷ�a�hC>�����f6�q�/�xs�H�j��0�ǰ��V5�C���U��TS+fgʼ6��|�jz64�F�՝x\I�|a��&�eS��FZT}���I�\8^7{A�ߤ��)#~)��o%,�tn'~�(�����,�wZ;9��OK�{�����sY>a��a��H�ϟpF���V\̇��(�@Y]%����>�����o���$��r8��a��@b�j7��%h[������%�$:4�������^<������/�}y�����?ȿw"�vl�t������?!G��QP��C�O�f� �=&�D�9�����v1+~�(j��i{�n:�CǢ0q��4ص��K��^�F�hl��~� Y*�7��.?P�_!*��h��,����O8s�ŗ:�����W��^������?��������[����:h����#c�IZ\�}���=�J��������
"��{WS���J�������R��[W�p@���CU���k���i���2��x�Kt��wO�>:7u�ͫ�?>�~�:~Bt�oo��[�]�=3?�n��O9k�sX*��y����5�H�� Җ�JA�d����E����d^���6��G��H�訯��C���Yݿ��z������׏��?z�畴]�o������z@d,؀�*��0�����W1�ܹ���uοf�q&K�c�8RR�N�7�V�6��J�Z)��zEu;�C%��N�ӡ{�q�G��;�x3^(څ��)�X��ZX���tj�'n↬pF���Ȕ�ϧ����3km��C�ʋ�3��׏�0	6Z�t�A���?�s�ځ�f�-r��2��V���s�{�c�06�fM�A3���df�~���.0�сB*�o�	ĸ�������}���?��~垡f���H���?|�Jzt:����Z��ʰ�_f� �OUf�Ȋ�ᎏe�^>>b�"+C������t������v��[S��<���W��$�?��?�2�Z��-��j5��&@XǡҌ3�	����JL��u����0���&6�����A�<�x@��f�`���d�S���ͮ�{V��D�޹ݷN�X
03���SD�2K��0��J�
���w���Q���N�;�)5$L�č[�Nf��{���0��!�j΋j�eU,�\�w	SJ�M�0K���s���S�e�b7��9�
�I��n�O�A:w
Sr��%uJ<&�Zx'^���qj�)l6��D�&9;�I�{��꿋 ��T�2=z��{�����k:Y	��V�aJu���-I�'��~�g��0��d!d�foIr*���!�����_�!q7�cf�9tYs�dS�ʠ�I$p�2�Fʹw�9 #��4�ݐ�4�3��M]ESr��z&�,��)mFa{�u�K��Bh�zm�6)�#%'��449r����JKW|�*�T�6pNT����ʒx0�Jj��B�ƌ����
�r�|`�U��˲�&}bʶ�Z?���	ұL`:�cYEL)-D2yDʴCYU),2l �'�lǕ4�tY�������ez0�㨨�"j?�Ӝ1��N�m�ˉ)�0�Om҂�
�1��x)��v0u2��XY�Jݏa�[�d�"����U��`��j<���=æk�f�=�]8��;�b�:�O��-;��Yh�p����8^j��[�a�\�I��ĉaWo�=�ԑ��JZ�LE #�K�Q�T��u�1�*X���sXMh#x��x)`q���P�iTG��%�s/��s;8���k�t    pP�Sѧ�ө�|Ul��!�a�*�F���[�RD}'#��"F�G����l�s����=���@��uX�49F��#q�e�C�4���zpg�?���k+��i��u��[��`wpp7*���"�\���)@�rH��5���&.ݤE:J�`�<V�.<�O�h�E�CP��ug�y����<eYHڷ�ܤ����. 	���P'H�9���I��@ɿf|��l���J#vG�����sD�d�����������^��&u��?K�7�ώ����,��:�l�4�����y��@Rz9�?pr��+����7OA�������7�}���*{c�o����v|�~�ġ�sK�u�|���{�w��_����������k�e�i,ճʶW|�<蚆�+��D�.�V%�s�1)�&�ꓒi�%J��\���pt�3�NKa2���k@t0+:s=û�\���lZ�tІ��%�F��65SH�z0��������a1zqqa]��M�L�z��a�&�1�hq�h)���=ŧ*8H]���o�l}��]���[��b���u�zEοU���]���)vj2���%^�y��o��E� �ՠ�v�t���V���Zsn�/��R�-tc)���X�!r��&���X��T�WX��*1�)����xM�W3�����0̻��W�N��c,�Ɏ�״��{g��P�3�3\��n�Zj��cI+�����eN�C�Ƥ���i/�n>�K����5��@�f$z %ü�E���s_g^��_��2W\
L1�BR� )^�-a�k��)��g�0��w����=D�&�Rܮ=�/�ğ���5^��B{��dM���Q #��RP]T�ܢ��u�n��DR�WI3���ĈXu�]���M���M�`�Y�+���@OYD��s4��/;��-΃��L!��yf �uF�r��WkA�cwvE)ޒ�O�g2�K�nh\p'}�Gk�A_5���Hs�N�=�����V��k9�_T,����Į��*Δ�i��oo���N
��t�3w�/V�S#׆#t��UG����T�$�n��;��nE���L-���^��P���Z��mC����B�V#XU�[�f�*߫��f�����ڇ��R]�`�������ehUY����c�n�m�y�v`����6v[����U&i�n���8���-e���FA�Z'oس]�m[�lg-��Fe���Q��ӣ�k������ӿi^��ၴ�����:�K�T;�+v3�FF����hL��@i�ݚnq�w�+@�b.{���c�[X�e|�X����bÞ�:�����0�P��(��?�:
��Q��eb�����ϟ��ŝJ%���i1EՕ̣����Li^����2];�B��d�oxB�~-u��������f����؞"׾X��+V�z��6tG����:�����5J���<@�p�"LA�yW\�l��-�u5���`�5���jĪ#�X^U��v��~��ޖ͸r��(�o��AI�� ���x�A�������A�kO�+z�����V˅���=�J�C�Ub(�*'��j�!�6]EKvft�eNë�55������	�$������Z������uY�ַ�U���9xe��4S*#C�-����_Xn+�����^^[�ϟ�`=|qqf=}�h�p�����&��Q�l�y�rcj{��q�kf��D�3p�9h��U����^��uM��L*M���ƣ�t����99��k����N��:���Y��i�틏(3L�	&��5f�I9���U��������'���l�×O^?yx�����ÇO��?���z���������"t/���ʈĢ�nb����}�)ـ��\����dl��ZcQ
�l��uS�M����Sf��<�o��̌>�j��u�m���ܗ2���d3�cZ�l7�{?�q�F�D��s��iz/��n��.��~.�����-�#���]�nt����$J�aE�� �p�]���RNLLc�Yn�-�F�&YҺ�Y�%]�&���}'�8R�y�	
c�p�Ƚ?���9�1������ś�ܗ���1�g�cE��}Ƚm; �pW���� J	M�2��I�}X.Y� ���4�o��P���y�������N.p�%��G�1��%K�����F9�̯�:�P�J�+h�1�;��B: !�E2�=���� rߍp��*�:�e|Z��Ix�ޥE�i�8!���c~��g��#G ��d��.Q����|jb;G�H�8m3��8�x��M��C�z=YZ@< ����y"\�}�,�v�4=lH�d:���\$X)mƋ���*Ʃ��>O�˃����Y��ٜxm}\�	��'g���֍p6�!� \~WZ$v��zK�<�R��Ghy�u"�aA������3(��bo�HG�ђ��|ī�*�.�e ���&N��8�-���K.zGld��
�� �])��0.�Eb�{�SY�5ˣ�m���|QL�(�(�q*X.R�Ob�3��5�D���`9���"k��0>�1�ͼ�L'��dB��#�B��Y��Ώ�r����8|�-���c�����m��.�'c���Yd�K 0H��������&����v�X,��Tn�e���ݱ��M~��Ik��G#p��뛈s^O�+IV���
���>v��J�na6̛\�f���I&S'�|X�L<�����{`�A떱�9j�_�f��Vi|���(�[�(�����g�F��;#�m����٫P9^�E��8�����$+��1�F�>cVB7�j������[o�ud1��2���ش-q��,ڨ�`
��i�e�9�i��\x^�y"�"��a�A�j�'���QVU9��޻ǰ1]��`�@�-U�\�	]��`�#Z�]
F\�J��9��e�s��6�G�P�N2ήCJ�Vl���j��ҝ�Ιd� �K����n�:u+�N�R�>�d�����s0���q^�VG��[ʤ�Aɢ`K	߹"��D˜un��/RǊ��;/�G¥O`�x��d��c���S����x�G���?���oߓ)o�[_r�`rϦ?�����j�u� ����I�2��Osm�GDQ���u��л�����b�ޅA�J� "F�����ӿ[WJ2��XJPkG�	w�����2�'����g8�)���m����].��p�Ƨ�	W��Y����a-+�Y����K�5WL;_/G�<Ê��ef�Ϋ[� c�}h�՚�}s���}ㆎl��Š���]��NrU�)ZI���zj�v�k�@�e`�54b�ϳ��M�z]7DPVP[����A�����;1���h�i^C��8��	b\�dk�����tSGp����S��9���/߼z}}����'_�����c7t��M��~���}x��3h��t���&(����Q�x�8�@��M�zk����3��&xɸ�u�nB T�u�����L?��O�[#+:t��&
�`
�	��ǂ���އ��e@{��4��#st��;"�LG'���߀��;K�Mss�����Q�(��+C��@6 �&԰�z�I��A+�r�|�Ԝ@��~<c<\/mу�R�q�~�#{�$�l2,��8�i_`.�hRai?;7w��/��h-�a.�����+\pp������ޤ`Zz
v���3ZF�&{�i6¾�x� ���Z�T��n�x��kh�~⭖+y�J�	i�Y�P��r���zԠt`����.��zXoE)�-�&�nU��������LWY�Me�ʼA)w�0w��y��x��RzC��+�/�����fe9��>�^Td��xya=Ss���>�k�|�wa���l��86Q��MY7m��!�4�{�2%}�z;�Q躨����Xq|��OR0@�;�0i�{ճ�����ytPg��Ӽ�d�Xz��#FC{k����y�,�ӵ\֡�t6bs���-Ho��XQ������$���-:�Ϻ�a�&0M1�z!�j-�����A�7�qc�i����7�f��Yx�_�
m������EP�    ~���[%bt�.f�(�����N�^:�F�w˭fF�B��S�y>�Qz�;%��S�u֕�&Ĩ_f�]w���w"�2f�B�D:�AM�qoSS�F���~f�fF��wti#��r��>����}�d�5�	~;[c��BD�h:Ö�p�]�(kw71/;H��j9����毀Q�F��:(��U��0������/��'�y��F�����Y�g�?lDd]��������u�u��Z�~��ضt��a=w;�h�𓖬�ǕS�Sw���m�^tG������~��E�oN��_YAh~��� �)��A����i5����~y������ճ�/�k��i!1'_�ti鋣\Wq8k�-K@3���Ad�}#{~���f�zFm�OQ���j��.���Mp�ں�O�t��9 �����-L����bH�?���͵��v�{v�1 �&�Oܫg��Jě���
q�XM�5�FG�x:�Ǳ���KԱ�]�=�����e�F���J<�)!���j�sDD�+�'p&��y��f�)� ؊�)��)���S;A�6r���C���i޵�Đ�;�8w7�|Z�;Jb!�ptD�e���i��3EEW�!sM%�B��_��|9E��b` 4p��vH��|�)���=���w���Y�&kj���¼<ͺ`�J~R�O\��"k��<����b��[���CJY�ЉQ6(��G�Q>QZ�Y��l�AST�袑 ���0�Q6�ܫ(��I'��Q>(��*�z�K������F��nU̠��c�!�w�]r�'ʧ��&BK�F����3V��藶i�9��!#q�6��F0ˉ�9�yyQ}R�xD)��E��4͘�`.�:w=��S.Q������2uO2��6.)h�X�A��U�T89�8v��mF��K�pT�Tt�]��h51>rPM�05=/XW-#�@S�ޤ&���G�DT;A�����m�GGIIe�zn�j�2�k;,�:8�{x��©+�^���a�l��������r�$�e�,i�.��2���4(��6!���x�!�H�hb�-�c<�����ޫ�C��e�(������i�q߳�+R�+��3�?=T���D�i-n�}j�<*����g���t��%��d⠛솯��-3n���Z\X�MjrQtjo��L�7�(u��J��yH:u�6�A���v��L �8��f�H���uε�2���Vk��[7�]&�:�5K�6���Dg���������Ķ�7���?}��ΐ����J���~_ ى�8�cﶂ����7�[+'�m���Θ�,��V��Y%Ӹ�~���L� 
��}�dW��
�"�fU���;Gah\[��5�F֞������.���P���\����njW�u�^GCn8z�cJ��� ���Տ����j�ˮ�x����P���j~ς�y)��O�<BÛ��`�!�I�FBɿ.ӯ�Z��'!�U�Z�Ԧ��I�4JΌ�A��?�8��qg��!ž?���u2�jP��z�k��U:L!����z�f)�+m��`kG�)hr�m�v�����F�M���u���`��F����\i�����<�뢺{��N�Yvf]-5H���X0�$�;�MQS��5�t���q۲��\W�x��'x2�����e�:V��*]o���U-}�S�������=���۾�����PI��[��{\.��x^�Q+����?~ 9��2����~+�#ݶq�)ݶ���o�58�R��Y_?R_���ת/Lg϶�V-�S�����0��No��4���.��@������ۭ�������~�^�w�#Э��Z�����"ܑ�W�Bg�l]F{]������]�?>�����^�~e=�~|��GK���Rv=�{���Q�A�a���R����3�w�\X�?�竗�t���/^>}�^Xp���ַ/^��~������.Av׻첟�x�ͅ���Ĕ�������\�h=�zv�J��w:�z�訣x��2WiZ��9"`�tƸ�\өA�L�z���oE�s�ϗ/_��Xɴ��x�B������'�O}a����
��|Wd�]�WɃ���|a����˼[W:�eV�h;�#�m^]�����>7�pv���ں�k��J�*�_#$�%]�.�UQ�놭���Wf[RB�6
�����r�U����0��[B�����j,+5� =<�7ݳ�pAc���Wʬ�wnjUk}󾞒T��β���բc�3���`gC� �_���c���e{�BUX�9�.��m�o���o�*l��.�x���1sv�z�H-a3�(�՞��]n�bU�l{^)�"\��=�vJR�U�T��[�0Ԇ�yaۛ�J�̍:��)�F �!Ge� ��}Q��á+��ÑX�L؁7��"�d�l�H({Q������)�J�{�^\6�A�ˠ����ރ�L�p�	�z��|L� ��8	U��7x�<�!�:�fG���P���y���.�ĭ<�M]�]q*�B�H@WL��O��G��T����!\<{����Kb�E�騊�`ִ�A�������შ
�Ԩn9��HC{I�9A�S�UQ[w�c]��Ӂ�Aߞ��A+�A>y3�~�L.l�lT=?���F�<��4���<=B2�ܭ�:��m�͖L���F'"t�ȟ�)IK��^
 �#$#�BV�=ljGiө�J�S�m�x}�u�}M�7e���ʅ�.�c(cq��24�"�b\��-u�Q5��R��nC�F��ȶ� �����i�`�㗝����iR �%��R�!�l\�t�u��6]����%��ݴ0u�,(e�{�) ��%����2"E�ܱY!�2�Y�=��qP�!�g?�i�'�?E�q��@ �QV��e�E����8���V�8�m�Uv1� �N͞��<�q�"�a�嬚��V�t�ev[�I`3Tw�#�C�i�7�95{:�\7��N��"%ʳ��i?�,��t�ʻ�l�m���@p����R� ���5Bnfgy�We���[r������5Y��Z�_ȩ=�i�v��.�)W:0���d�r
݊�}΢�`��t.j�d+��DU��&�æ*B�!m��R��kpH9:X_�D�fV�ꉳ�ɧ*c:�t���w���#�c�ѥs��k�vKFg;]�M�/dq��m�s�:�.�GH%,ԖQ^��:��}TdS�T2(*;NR?M���㭲�*d�P�^��欟K!�K�P#�ͼ�x)���v=44Et�b�SUr��]:-���y���(/�C���+b�P�!�$����IN�����6��P��Ҷ��{���f&	g�S��N�"B.����T��NaF߱'�M�~ �>��:9)� a')�HY��	0	6b�Su�/��Cw��-!��Q��K�P'�iDS&u��W�����F$�{�N��wu'���q���.�C��x!�y/7E=��X���农����&C)aM���8X}��䨊�e�w���(j9&q7�c�?��s�����"-1!8\.�������cYq_Θ+ˋ�c[l��pOU�^R#ߞ�Ɵ���� �Yp�*e{H�*���]*��u*Q8��QF�=U)�j3�dSM��X�st�*��^��S�x�	���q{�ݰv�S��l������4A���TS]��J�U�D�����dBu?)�6����*���'��l�s��y�.�C���4u]�:.�ä�-6��S-e/p=A}�F�З�F�K�P+��]RX�9��/���0Blܨ�㝪����F_00�sҔ��:���2�t��T�g��2�2$d�b)�T�,x���ك�G�)��x�je��db�;���液G:	6�XީZ�g����q���~	�K�P+3��^�d��)N� ���d�aq�V��/�aJ�_�n{W�Z.�C���N3�G��:e�1�����{�S�r9�R�
E2JD�,´b�C#je�Y��uXt�����A��AΩZ��-�KѪ��-�m���;��c]1�&��a0O�]����[��ʧj�2�i󔲐��_����3�\f�dj��&Jܞ'��nhe�T���t���d)Z?H9tjv�r�W    4l�l��[$mb�h0l�s�V��
:��t�uN�1���z@N��N"�|$�e˒��o\杪��*^d�Rٹ�!������VN�&P8<��Ő:3�[��l+�AZM����c^sZ����[���t��E�B13/ݺ��?U+G�p�&�0��n���t�j�!j'@�ȼ"��NӒ��0��S�r�|RM�B>��γb���je�$ud㍰�]��E��>�T�X<2�H��*a���0_��Zy)c �8T��(gj�:{e�8S+�%�;�>����������4:�È�f�#�il2�(��x��w���1�վ]C�tq�]:����D���O�N��v	�v��ߪ�t���Ro��M$Hp�÷j㥬	��9:��r�ܮ������sm<_Yk���T��:�5��+�YO��RRQ�N�,H��t�=��Eb��lo�=����*��ZZ1u&a����W�ڈ
�Q(�.K�s�4_��9�OJ�2�iT{�"`c�C4��6H�M���x��2�ǰ'���Q#�R��:;u|%���	+={욨��f�q�����/��u�E���2ޒ&,pn;Y%�{ƣ(d�&���0�e:TMߺ{1�S�7<2��*��Q/?]Ź��_�W�!�*ν��������E��f�i3(���y}�Z���1x�fa�D�#���AN��*K�C�no�R43���0�7HZ�1�?���霉O0�q�b��
Md�N�hLQ;s�е �wa��k��pk��)F�Z�F����k/�N���w.�T�M]�<�%u�.�b�fL���(Xt��^ﶖ�C<�m=1$Y��.���x�!����j-� ���u%���k���U�j#T�Z1b��̂u��Z>
��X��L���ה������5m+���q��b��kt5�wC��)y;O_���;�8oW��O����x����Gw��tA��B�ś������Ig��ەl�����w/�_�pT���4w���M�GpW���$�֪�h��p�k~2d���²Y	�������-�8{[�v���]�H��ߩ���w�wAf�R=Z�	KU;O�LW9���?��ӾA�����g�`k��*#F��q]��l��Ȇ����>(�i�U�r�^h�K�1��)\R�ZͼR&z����R]}����C�k���4-=Y\	���޳7�&�� &�}��J3�Z�MM��C�vr��bd�f���yW�Kכ4gs�*.0U ��h7��OSM0�K�հ���Cs����uA��_L�և˙RE�)ֲ�+)�e�j��N`�E�6$u%$E�k���e#}��Kj]*�dO�~2X���7����Ly����&.]8O�Z+�yVq�O�}������d����Ϩ����۴�^ͮ���v`ƣ���_[��XA��wwS��3��"Pc2	����gE�(q�ˠ� 6ג�����M����tzc�A�@�F�W�T w�X1��� ���c�?�]:�	����֦t2�����_n���j:�UZ���LRҪI���|�����o�̺J�ڂד�o�QhͣS\����r6�sw����I=Ov��/�b^Џ>\�Ԭwx�k�2��tv;=�|��s������F�ߨӲ�e��V��-�t�1��@�}O5P4M隂�c]�l@��G�Q�)�'M�2�iJ���գ]��uYt����H���Tꚱg�-r���:W�v[�C67�lX��sa}o��������UT��15�z��kԥ}��jJJR%����(1�݀�z�2���*�W�i��j����>�5�N��f�X��y��J�]>�Yj0��f�V��EWͨ��Sn�v�-�j=^X�+�V9�g����\�Ϡ&ӈ�����_n�߉���wY�I���Y_�J�ae6�=�~�j���񨎗�GFf[$�  �0��#�"�=�[��M��p��'=�_��p�;�#�odu�0E�;�/ ��LMMM��Q�����`8��u$�[�N�]� j;�2
��w"�c��<t��w�w������B����';=v=� 7\������{���.�w�;��~
���ر�@G�Jϙ�J³�qZA^|���.K�۳a���5r� �ɡuv���M^��d_��	�O<�*���3A?(T8'�B�g�	�4s�s~V�����+���B9��UҌ�
㹑�E�be{&��1����(R����r)�
���G����ц�_1nOŲ\[y�9ey.�ܬO���x��B�f߮�8l{\�������cխ녴��'o�@���j�(i���f�w�f�{�V�~��?�T2�Y�O���	���]g�%w�I÷P{�`���@�w"��M[^����%h�,�i#��RO����|��y<ʀ�<���1��31N��1��5�W��� kw0E�Zjê��󽌗����p���ř4�I�m���������e�Rn�{��$[���ʬ����y���Ry��/^Jx��+v��:/?u����Unf�;�,L(;��|͓���L낖��K�537<�^�I�2��,���Uw ��6H5T��D�+c�({W����r��_\v$��uF��	6�qK+����L�k2H#F��������?
��J��ϖl0	S�W�g�^r���3�,�kv�L�}v�)�_��1�/T��g�z����?�v6܈�����u���ZU��4����x�,��i��'�BM�q.����Vt���N��<�ڒ�(�hʁ����h_wI�����!�i�+{j�4�P�i���" �*=�;�d�L�j+	�Q����P۬����Sd� ��!I�y��c�ۖ���ue$����i��r�SN�Ku%����d���Jjm�ۥ�����;�0�:3r�(4ۍ��c�����O�|�K�2�U'Ӳ����=I���7i�t�$��s�(,�=��G$a�};���B#]�&UAM�$L�2<��6���C���L��X<.	���M�D�:U�֊���\ۮ
�(��ϵ")�j��h,G��3�M�dʊ�⺊O��J%�g�0��h�Z���L�W�p�3G�R��!I����Q�~o�����J��al���4��60#7�G�C�/���wlh��m���������1P�x6�F}�Ƙ$F�h��D�i�?6��5�<3]uS:�I��%��Ԑ�-�"�u��fAZǑ�8h#��ذ�\6��c���TmC�d�U~*N�IUr�Ũj;�-�R��(a{l��XVa�S���L�8���]%��i�($�;�qMc�t�����vg��O�&TH^bC#��[%��U�j)Fd�d0�.J���(��V6ݑ�};9Ñ�U��MZjb���f���v��Xc�$�kh��Ae�h��ϰ1]��aP�z[}�����S��pժT{�K,���\�u�{����I��{���f�ֲ�D����c>1a���R{�Ց�ԉ��u����l��Fn"֧��tţ^�bm�`������]OH�'�F����LV��+�z����q�:?����l��$(����ۮ����H�����P�-˩@��1�+������pp�!��2ڪU�&)B����|�c���Yq�;z�sZʹI:�������3T�Jlצ�;)��I�Q����T&�8��,="cם��S��IYgCd)N�r��MC4�̶V���ԇ�NeO�N�D��ﹶ�����O-�p#�kݏ�L/���u�i���ԡf�0��Ӭu�0"���S�t���(���<� z,j��[��GjcS/���s���z��NZ�Uzj�)�T�^���'FY�"i�l�S7�S����7R�����j�X��F���n��/�EB���X��H�U[��'�����kL�tα�/�-?���ޟ�!���/�0��_�F���
/���t��_:#�^��多�X���;���C� ��%Dd�򀤢��z�F
Ȯ(�� r �P�<��67��h
����=A�ʋ�l�ɄT	��	����~X&��l&��Y|!&�c�ND�7�8��[��.�ٸ�o�$}&a5�!�j�]�b_<s���΄    ?A�HW�-���]<���ߊ�mC>�w�Ζe��&֣��dYz��ԌSː�� 5!�@�����-{|�HU�Nܹ�� �����\RAK-*�`ɰ^�XΙҙB�P��f�MX������3��n%=�����/j��@�)����:oY ��%��� -�O�@��\�0�
�����7�@��@O��@K��h;yy��M�_�f.׵Y���-CbSl����_OL��]����� ����������������g�Y��8����7��뗯>^KW�חW�.��-즷 �ߙ�\��ſ�/��S�:B\�,}������*]�A[l\�Λ�_�G�Tpk���"�J�GzѹO�3�©���;���Eڼ�G�@��A���u;� h��n��t��M�F�:-3��Ң�݂	�.�st_m
��ks�B��0�����."�_9ۉ��gvKf�@$}:Ħ8bS�u.��~��Vl3(39C���ɵb�E>��+��f�P�6;x7�ִ�|�Du�o�6Qe�V�هV���,	[�n��Al��դ�4e�jU�lۍ�jbs����0ڝ�O�YA��~�؏�آ��][Wi���U�*�&���j��*m�r<�]^U��� ;�z�;�V���l�]���n:z}��z��jlES��y!O����C���F��ZY4D������}[�[�nH��������ˊ2��k���3�3��4�E�>��f2Qfz���^�x��Z	���!6;p�)�A��02���t�Y����&7���s:�ތ:��;i�51��-���ec vb��
H��R#yQ��7�4������-��|bC�uzja�򁪺zN�԰���d�U����iB�j~�#����,\�ҍHK�%����
F��Ac;M�Ѵ4i'3���ߢe<�b�g^k�r�<xc�L!�P$;r��(~CǈhZ:��;�!=�WB��YB��c%W���WV(�I<3B��dj�y�ǎS�4�H��D�B �DF��.�M�d�m��^�	����r��ML��R���l8y`~�]�~j��z�M�vy�E �ȥ}��6MO�R���3�C��4��*Ior,�8�&�쨚,��c��c���>&�mqh=���aJ�@�:8w� `Z��"���u+u�G��z5
��01�$�ͥ�`5�K?�!𶖍�[O��o6����2�{\XuB��N�1v7��~�7Vl�^�S��]I=�'��o63�7p�Q�����i+����oFf���VU���)J�yO��o�m�)c۳�Q�:��o\�� 	r�͹L䤱Q�Vd���}���fەݾ�Gf�03��T���c�9�Ғ�AK+ۣ�Oe�R' ?>�N�ȡ�Z������։_�]�E�+?x�S��4�8Y�Y�ZZ	2ց۟my���A�����;O�%�m�X����a/���k.���&��a6�!�ok��{�D�*`�_>t��.^�l���yK���==t��JW�`�x	%�R܈�q�h�V���a�El' w��Hڷ�弐۩�b@s2L)8���k��u��k�;aD�<��9I]$�H�K������K4�/*���缾ф���n�.#q��~#q�{���
�Oʋ%;{����<�
��m�y)"���oӶ{�c�s�^�F-��(r|�j�K_�� ��	k����쯀�`�K�3�ݞ��~	�f{.� [:��qj6
%�d�J/�C)-�� �5s���Hd�ԗt��&`$��AA�ա�Y���Lz<�;��<�p�l�_����s(S���b~&�{�~�-�X��	�1�H)NS��J���
i�)�X�چE���/�?Ip�H��i����9�r'$Őe�f-����f3��-�e�>�-l �hn�y�{��#��7>\�'�%�OIa��[�D \<C�G3IB��`�������SS�PL4�zl~)FX�MQ�3� $j0E)�$���\���G$��V5$�7��E.^pJ�S�.�!��"�:��_�m.jD���p̍	cވD�U���ݮ����.�s��Xj�@��Ý}td���Av�o���(�q$K���ϻB���y�� W:��a.�� K^�tjj+Hi=����[y�\��Qҏ��/���'����E�����{�z��{�_l܍S�鱿_F�����X7F_ }_����HT�SUV��8/���w��$�1%��Y�`�0=zM:����������m���o��2�޺Ѕ�OЙ��L檊��K^��;~�E�Ӈ��|�̑��zv����k���ۋ�[���~ "�C����H����<����W�1��������/��?���<;�l� ���\�]o߿�|H�;E�朙������ ������l�9z�j��5���w���ǵtquy��z����k���t.���Qzv��~5/�v��su�Q�ȉ�ؤϯ���J�qt�eÇz'ͼB1�} <4"M���~,
��m��9�a�:�&!��,�*�[,�A"N! ��`{�;<�'-^��ڗaOZAZ}��.V;G����xҔs�����kZ�&�#m�(�OQNI6h���nD���<9�c�GX���[Wm%tQ�������tҋ�Y�b4Y�mQO��p��ۘZ6b�Z��'mp���p���3<L��L���8z94v�����Y��1�ޔ���(8P�aU���'C=���՜��� �د����=
�,�o�����c[�0����lE^؇�����*�h�2m��Xx�PbE��D��*2+'ğ�'_�d:�@,�N(�I��4?�S����u�Lq|���E���4.��э)���Ɠ�OF�=�I��fJ�H��<�أg�U�)	U�1�
���7�]� �L��Ik�1�,Gc��'S��q�"Y�2stBڨu�%�F����d��8w:ǺU{Z=M�h��I�mָ�1vS�X�]��q��̑���g��i��$�˺���j��I�(�
��\�*B��zF�m��[�@;�VC'[�:���z� ʮ��D)����e'$������G��V�Ӱ4K﫱�*w�����U�qc%c[�]�W�D�!R��Wa\R<��䗗]�vu�Y�<��7����+�$6�`�����ݍiz0V*�֪]�L��ψ\=�$[OG�R�6�����!� *�'��)���ͳ���o���Xi��Y�����5G)�&��[�k�JW� �K-t��"�U6�[Xijc��0T61�����.s�70�W&��I��7�os1�ǲ�U	����/���a.�B�|��Tg�Y�Z���x~^�jѣ��~�S��C�a�
<f�R��M�s)�h�r���fH�
�@%�u���Cb��b��V���uTk���t���w��*}|/=}}����՜х���O���� 9�!3�L	�s"I�X�� �p}�t|t�;�f���;�D�@��K��>~G�	��((�3p�e���S��_rt��=��K�Q�_�������Û��M�.'ɝ���@}�hE�8�	��J(H%�j-H'qV��<���!i=GD K�N�ʗ�̀}�O�(����X�Jo�]�_\rO��w�W^�Ц�}Rgs2o���'�LzS���e��_LX�������s/�>�S��0�9�s&-gW/�"�ZD���j~`4���� %�R�椚3�v����7^�mg�H���N�i��x��s�m���?J�!�|5A�vЉ!�ڙ�\ t����;�MS^ڹr$�b�Reݖ���_\����0���qƟ���x�������կI��	�ߥ�g
�<&��Y�\~&�e*=�y����8��?���  g��N�;g��/|���?���N;�w��?�?����5x��(��a��8��g�i�~�q
?0Yd�������[Zv=���OП�����Ì������r���_s��S+�);9�(e�.Y�-����jN	=e�~=�Y���d~���w?9|�[�ݍQCNK�T�xP�1Is_a�Z��fYb9    �\��X�:[B����΃�i�?I�i/�,� �����۲��x^�o��U��W�貤ġb8�Az��p�<���[�S��Tfm�o	�����z��a=&��Z)���߼%`U�+^�Z �LئI��7�{$�rg�$�bi��ţ��v�XDR!R��03�73��9f��a1n"��lk�΅p�E��p��F��g��)D�SE9U�}~�� ��T�hHi����WQ���� �@~9�>�m�������8�?>
@t�4���WvئAT�ɺ- �df�V��'��P�%�Xר� �ԭG���"rbעU�	 ��7N�9��;ÀS�y��F�cD�js��1)�V/M-I�%�	��,�0W3�n\���A��t�@Wvz�TeR�����@�F5i�NC+&3׬Vmʣ D�zߖ�ix�ݩV��}t�h۲��E����+�i�rG��X %M��ԏ47�&JL%��� ��N���I&RV������a�
Q\�E:r蚮�t���ޟo�~HI\�=[#��%J� ���r�u-lG\N�^�r�X;s9�Ԗ�C�f��"��fr������������U¾�}�f�3�1�a���R�>ΆJ��1�~0��iU��R���Ȱ1Z���h�eR+m�J]U��\O�pڢ�;�*.��DϧM�ѭ��Vhf��� YF&�2Ou2CI:"��E3�9�B�j��i�˙7A��3��4��1��7<��|������9�T�)�v�z�l0�IM��
�t��=�3�*k4��h�~�lTl>δJ�+f����9ښ��(@�f�^�vQ�5}��:��/�3B���4j�=�Al}�yA����-%��	��/�ȏ#9͑O6��c9;�V�;�g�+�~�5њ��b�V�f�ڞ���!FZ!�ݢ<��3�[yp43��ʩ��靱Zsv��YO&��l��1��ԁ�%�orv>�;AAp16V鴓�k�;�8Z�vFn\(� jn*i����)�Fw�T�u��J���˽�}�i��쬽ʰl��jT�ȷU��pٸ� g����
�5z�@�֜�a�x�'ꤌ��M��>��q�"�h�δT��"U�BůcBq��9;sW��6vro$lC�:���*~H���!���&	T��r�O�u��Q5� J�F��-�+}�At��=�LT锶���i#�����W���k/�]x�kV
�� �/��!�.g,��Jl�U��-3�(^��|��|)��;�]�g9`�T�#Q��]εs��Kp��˻-��xk5.��K�.Ѓ䁡@Y+�VH<���^�^!���G�B�H%��p���C�	���m�svHe��Y�P*� 5���9v�O-s�=q^�]�K���G�2�tNj^��V�r�9�>��h�X� 3"U���P����.�OHG�EsI-�^�P���]q -E9n���HB6���uf}+�����Q!HWA	b�3�6�0�{ȃ�J���P�Xz�ʒ>Q�2�	T�D�ɋk8��|7|`�3���Y�͇�����y��?)�ji�e�ڷ�
_l�a�8gN �Ѣ;
�4=��v@���V$��1X�b�;��!���^���~��'B�ߠ\$+��~S���)[}����=���R�N�┧"��'^�3A�b3���r����qfGB�[�z��b��|5����8�j�mM1�͸��l�w#sϬ?��G�v�E�8�������hs���N �B�+��\<	���	NI8v�k����el� �`�Pc@y�G�� ������!̒�5�Ľ�WnQ$��s̱��D������G���'�ȥ��BZ��o�������K����x��hµ�M8���Y�gޗ�fW�w�\�8�y$����&�ȉ,��=���ԅ�]ycQ8�`�{ݻ*y)�5B%>�k2�^H���K�?��Ut"A�T��J$�e���'/剭�²�#|N��5�kX|�\�6�M��D~^��C4�3��p��D�r��v>�l�^qA]������q�A�Oؘ�*gc�~�Z�����Y��gUrT���.��bp�����{�Rd�J?��>U�o�Ey2�;�\e~��0P钭nI==/�"	4>�%Ai2W��"�����$��+�:�N�8�O�~`�o.h�ξz�Hh[^D�˪P�97�3�v��e�Az��J Q�*��Z%�!��ff��JrnU��{����]~/[G�v���ˏ�?\�~c�az��"�L���ErΦ���^����Ի��g�Xu	e=��Le e4[�.�Y�4p%cWrk�� ��8^�>�.5OQ��d����ų/��B��I�'^~8��Ň>g���?���ZuϏ���!I3�s�OŶ(T��Jհ� ��L�i~~��xFT�-�,}|�N�N��給I�T�����%OX}�����w�V- ul�m,��6�9,�=�-y���{��3�]Fc�lӯ�:�Lz�/�FIe���>�� �����ƬȔ�n,����P�H�g9�ZAx��L��	�huxa:�r����D�h�[J��� ���I]�b�-��[
�+g��G
�g�sΎO��3��Dzn���)_ �Ϲ�޳.ވ�٣�K���7Jߋk�0� ����0�w�ֲ���K�l1J#���pp1��j����a9Dυ��t.��E[�;2j�U���A
�sT���߸0U���/D��9FTTx���y��r,����U����U/5=���B\���]yw&�A�TUǋX���<ÌmG��ŵӢe���M3��E�����]m�������%�o=�S���B��9��c
,X�!�E��W�$�|�{��n�=.C�s�ϛ~��Ģ�������EPu�h9����It9TE�eJn	7fk�t9NC�����!�6����B`��A;�i��s^9�Y�H�؉�xj8���65�C<V��'K�Y��whDJ~lgO�)�N�6\���Lkz|�q����m <��а�1�~�3yV�,X^�xmB*�R� ܽ�\���#�c�����}d�]�b�X�O.�4�(���yW[,�1���P��p���^��d&e�{K
x!�c�Lr�#��"�*_������}���͖�gbO��~�2m��_��z���y�.��������g��+���_�h�V�'�����QA\���Վጛ�����^`-vвJ��ܦ�ڦlS��s\ҧ�/�\oN5���'��r��������*��_z~��Ԗ՛�]����T���k����Kʛ��+�|*�o��������ٍ��������ӛ��tY~+�7lt�.��ء����+E5n�zXz-ʳ�ֺNF��y�S�;�[��-�k )��0I���mF�����Q��<�؋�T<cj>���R3���ARa5C&7n�6��r�k��	K����?I��E�:�_�Ђ�b�O�O�ru�Sʌ�P7�T�������oݣʶ����p�jv�ͥ�a�>6�N܁{J��q�2o����_^�C�
zq^�3�����2;�1��$<��/�� \��X����S��]W�.�aV�_ޝ�ҷ�y>~���9�����h�>��+�+2�ɑ�>�ͩ�������S���$���M~X��C��������ٿ�U���7קk�zNPV�7=g+Uz��k�Zt�m�V��l-��(�����N��
��o��pJ(�⩩�m�x}�a��\j7�(� �+�9|<��;;̓Ղk�H&8ҏp$+���b?x�)	��}�^뫗u�1�Lzy�*��K@"��[��v���&�\��+vhm ,x �ty}z�㯊�k�g�,�{r~���(����Xk�Wm1E����+\{m�������X�{����k�|-�a��
�����7��/�H�f=�) �q����}�HoO���Cau�ے�������� W�\�.�>��}�?�Z��a�=�`�@n���rp]Q���%�C�3y����T�t�(;��*��-]�`�l���+�O������;`�����q5��y��0���Ve*$�    �����ٱ;�\+��z�~*�Bl��';`����y����K�n������@������M~�s�����?�P�p'lc`7�z�7<iӕ-���	޴$yr����$���(�2w����2my��>�cm��Wc�eeD\��E~�����՗��<y�Ý��!p�X+�����dmݵ;w��++�-���Ȗ~����G����m�fJ���������틟�[aQ�%`�So�������L��(l���P�;Eb--�2�}���W<�ErӠ�^�7����pd�-�X�wY{`P��-�qO�}w�������P����[n��Xm�+߾��G��g�b���r�+�zγ��bSw�6�<�aˮ���W�zo=�ت~�J	l�8�>�y{��O�^�()�zK�Fȕ4]~�y����������C��m��w��R����~��B�>��5y4>-w��oQ��LA��Vǒ�,Hf�9Q���/`'k��)~���S�9>�v�d�U����)���S��7��$]=�,��ϝ�>iw�M��Ȥ��(
i֟���9�p��w�t�/̪ O��Z�dxi����ei��);�_l��!=k)�l���r֍s�|��8�M���MλN$:��[���sf\2C<�뢦�u��8k�c��p�`}aJ��gl��<�+/O������P|�c�@�GU����[���>�Pw/����F?�(}�I�����a���1�t�2a�k�~�����_~�n��ߠ���^�_�/���#��4�M"�$u㡟��7V�tL�����+:eZ�L����X��������̂��n?b�p��� ,�	�Z��o
��L�X�2���s��mڲ��I�7
�B�t�_�R�!��w��eÜֆY"oݒr�ޞ�M����n��d[�%^�fQu] �>jM���q{���7W�Q�r����~/}NA͖����]�?�lP��O��  ׳Ŗ�ߟ�3.��ks�����?Ĵ���C&g�On1@�	6#n�e�j�t�5Gݨ�ݰ�Ͽ���X`_��<�z�2���f�qnd዁anް�ζ/��H��-j��PH�	���J��D�ӹ�#C��@ �������?am�3Ov^����3�;g���{�P�����7⧞x�iQ.�R1�\oB<9إ�j0|���ܗE�K�e8sq- O
�P\"��1��#�P�|����| ]��.��!�T����.�g����������xYvQ
����)��0�I?�_�S�
O�� �$x;>$��L<��o�+�
��	���I�����s;N�r�r�;i'E��"�O"N�ľ�� 7������"*���������[����3'��Qw���2s_=9��7:��r����0�N���sXe��:�n�C�Ɍ��;;>�4���H�| xx�q�=C��I7invv���'���p�I���,���Db���K�s�+��wj߅�W�nU�w��S���%6��3C;���:���q��o�o�uwQᯩ��{��j,`�Ȯ�Љ�2ّ:|���w��������
��o��H���pxA��s�EQ
�R�ы���X2k���&�~�a��K���"�&���i/��!��ϩ; [Ï���ĄQA�ӈ)J��Yɉ.��Ĥ�-j�EO��="<��s�����>���PΙ �S�9e�GR��C��F�6��p��A��&;��U���䑭��*D��G1Ah6�8[��|��ʕ�-&�Ό)��Bo[�r5ʤa[[�8&���L��Z��A��v]n2A�n�UZ��e늍��uܪo��2A�I>����ҬG�6FD�*]ך��̼$v�w���ɉ�w�Qb��'EI�i������Q$4e�M���HF]g�*ЫPK�b�0�A��$M6Jr��1A����n�&Kq�׊g��1�lʮ#��W�ff���>��:��=�w5��tN�)%��L�kd2v-�e%�*?V�~�,�g�\?�Q��������CC%�۪��]���Z�F>������Vڦnٸ촐Ʋ���ϲ/<4	���l����Iإv�C���h�ʹ�mϘ<\}f�#�>K��о��"O�±�Ь�"5-�~Ž�(��j��!�ʬ�'/��A�?˽�оD��=��^ǩ�=1;oE��M�B�E��M����'�gm0�Y�Z�+�XF�m���HMs,V�n=�c>9��Z;��D���y��Sc���8fIK�#��W�z�M�0�6@E�����i�˚�>K��p~/�]-K9ɴflG��Ê{��R�It%I?�uH�H�^��T��^xH�8�h�-l;����]z�d�S�c��܀�}&��(������-�����	��J�/�-��;+�[)���Je�ѫ��afC���7��4�6-Kg@LW���x��5�M��]��QW�C��U:Zd��E�`^�\nZ{
��lMd(�u�m��OZa�����e$x JVc��~Z�^�����,D��k��n����k�w���֞s�����<�[{A�ڻ���nn�n�㛫1N�Zk���+����]���Q����{W�=��E����*�������~U@Z�W��
��n𥉉I�h����o���ה��W�a���N�f_H 
>V ���D�F������7gm�d˽v*�k'+��ɦ����Ϡ���$��]o$��)��ݼ�4�s@��6-
� ��9A��p�	W���5�:3�����3��L��k�]����H���ʊ�`�w�M2�,�1�]��~,��d�q,� /f3�e��y-��;,�+"<���HW��H�8��R��c{��g��A N���bi'�lv)g-a���+�{��9,�4$Pa�-.��XҰ��LJ��t���D�( 0U>(� �mΟĈ�
����b@&���1x2�L��+��/ ��?���)�qz�]��f�.�;�>*�i�C9���uI�|����s4�b��d�"�s��g��>�9#ႭX&G;���v��n���շ��^��@��]*Q�&>�Lp�5S<솓��� &�8R#�n�=d/ z�T@Y�+�JÜ����~ pB1�"lA����:�)�Xsx3�r��~���h��h�Hzߒ�qE�/�����z�P�`
�����F@��L)��������Vo-| ���K5_Y��ʺ����WϦ��
Oʦe��r�:D�3�!a[;�͏Ю!�8@m�����Y�#�/4 �L��;�"�:�Z��{���C\<=�Zw�F��h�[��(�}��Ϝ���ȟH!���,�(�i��PBdYT"kp!fۯH�=�^��8��pe7	�
D�A49መĄ��U(�~K�)����
���za�Z�5>�?ͩ��G�{Q�14-�،�<)��$}���8���H:��fs�Q�ZZ� ������AXu_(����E
i�0@�.&��_7��E��������A8ģ�Xe���`�?�p.N�!hp`���!7�:S�1�O`��Q'��Y��*L�~N���2�;�L�Y�;43w,; �.=Y�eyO#��?�S��vI��S'y�λ��o!}�-�b��Hsg$�p 6�f��F)·�;Ǡ9��ƚ�Q�!�f��P��%���#��-X�m�3h�� ���
�=z`����� ��駫�W���iPd#~8��<� ?��D�`�_�L@`ߡn8I��B�a=�{q|q!|�0��?����oOnܲ�,�(�(��)�7�P��a��S�<�oν��!7.�����P�OWs�������=^���*�TlGA�ǎB%������;NP�ԂGx῔�<����8 ���|L����Kj�Y@����}78'��/��cz�+*���<�<܅����;�x��'�;�uP�l�Q�NUm_��yP�J��aO�$�CZV�t
6bT�FӚ4�TG�Z���"ǈF�bTF����;%�Pu̾��U�;S�ulG��f����&�{\�J>����L�pt_%f���Ƿ��s�����Uӡ���j���L�в���    0�;bT�ز�*Һ����h�Y.�����ht���Ti�h��yO����T�}����vD*O��Q)Ječ�N�g�z���}1*�Z��萏�we� fp�tS����2��S�ɲ>%d,h/&F��4sr=�J�):E��(��+ĨXJظi�Qh���"���ƨD]�F_�k]�bT��){iR{�#bT�1RjB��q����j�z���A��A������cA�!�(^d�������N�D�,�3U��bTU1��K5b�Zb�SXt�b�#cT��
~6TJ�dQ�ZŨ���U�g�S���K���ʉ78�����	Vey��h�5R+�*HE&n�jeX��d]�(��D��~l}�N�F�HǬ�K�B�zC��Ri���]�cE����&��>�6F��(� l�$,'=aZS�B�V��R�e��<�L'�3����űUnt��(���AS�;N��U;#]E��؊���-W�Z�E�U����J���N���L���oI�����Y+3;{
&}Ї�~�G��[%0�-�gv����2M�ı����BF�Z����%�z7�����Q=��!�>�����ۈ����.2��4D�c6�O����rB��yx5��Q�ְ�Xi͊��bx�QuS?�ԉHSy�P	�����ݸsrK6�.�j�4n�Ѻ@��&�etf@�5�����~ʍ�lyH��Q�1�T\�v�UM���Vf<h���bf��N���B��+�[��[�d*fa2s���[�VM�3c���[s��q���qn9�#­|�(��Q:vZ�j��:ܪ.�AԆ=���A�+wب���p���:3�\Ks��ǽ�n�S�����&�P����W7��\�&��iO^^��N%�q�цIƁAm`#)]WI�Ԯ�xKI�j�n��%~���$�G�g��ٶ<t]�Z��������ך�#>;�rU!�XT��H�B��'�y��#�+�N���n��&.��(c+��|�gG�1��Fz���ff�)����l�lp�i���LF�M�P��_?�n���Vlݭ�	����Q�p�[;"�Vc����n�0�[�w��#��n5vlܭ����ܑp��;* �Vk�ƿ�j��־V���M�v��#c�n�wT�ۭ�Z���w�ooPd:"���7L\��f�
���������W�л��Qz��;6>�V��nx��Q_���"� x,/�����c��*�#�;����.҅�|��A��_�ҳy��S<X�Q1���+��0���8��c���3�Ӛz�o;�
���o���z�+9��<��3�ĿAL�:�9@U^�I�)ò��?�/��^ 3	L\~�cLjL���2��}�@�I��uXu j+D��}	�����K�� z�p��hB�0������%��"������G%
�I8��YPN��%БI>����\�� �lj�q.ư��o��oS@X	��^=F	�VKXXӞ��������7��^�c�� >m�}���Zh���4�G�	�9�_Ãz&E0^q�s9���#xEQz��`I��"��a;��& 	`��+�=\x���"���4�U!~���Eq�<�W׉����&�����T��]9(����`��@��d�a�!��%�D2�yI���y�E��  �̑��H�m���F���BQ�9؏F�M�>0�(����H�qU������#)T�a�ET.����^*o�ϡ��p"�/դ�w3��\����`H'�*)�- �x5r�v���=<y 5E79�=o�즐^����w�?������|�.�}z}�����w�o��9W������^�JdcR�`���9�@����r�Nӓ�<��6?�R�*z	���0N�BE�7��g�)��[&�韾���|������NA �~
���mͼ��>|�DH��U:.TP�cbL��s���ݫ�hy��f�b�M֭Q�q^��ǣ�|b�a�O�������7��?P��������8cK���n͇������ب��݇WGjK���S�n�Qb︡)��hL�ø�}�O�z!�� 'vUJ�g�c�1c<`f	�Q��2���(��efj�/�1�("b�;��n�X�c�����H��/�,z؈�)��q�����ʘ
;�;���6#��YBzn���N����Tb�R�4e�Y����v�����7?(մ�˳�2�P\@����?_\�3���~��͙e�տZ-N�fT:<��T$%Hh�\&Xn�J,7�Q�I�M�����rRi#L�z���<ʩl���cYf�xH�̳��S�BVt�R��}�J��%�Hff�������
i��ٵk��a۶[<1�4��!i
���Js�����q<�h�J�N:��ا:�X�`3��V~b&��6�o!�L���MB��F�Z�f��*���F��M�;"x��ה�8!�+�ME���"!>&����J5r+��Io*:�����ʊv2Q\�o��U��M����Q<AmVEߦ�0z���UQ������)m��9�m���J?�[��[�W�']���B�ZC���<�h�Ŏf�M�Ln�(�z��c���~����q�dǟ����ԋ\�LU;U^�`%5��t�<h�ԡGz����ɠ�}���{��cô�B�MlǪ�(p7�:n@�F�G�T
���"=�d���
�e]�k[Ʊ�?CE�����Տᙴ�(�
��Wy3%(0�UO��QSX�a�Mf�ޮ��VJgV;�f&p��+,��
%)��V<ji��(�fk66k�,�^m��G��"�Q��im�/�0B�*�'Kb2�J�i^;�fYW���ؐ븁1��ЧLV�r��Ǻ�g� �\!��(i�7���R�&���K���)a��fN��`���[�䚗d8��	;�zN99��l�Ym��<�(�G�f�>�*�M�����:�g����*ZU�N+��I��P~��wf�ԩ>2��I��:��j�*f*�H����ftz3��n���f�C�FQ�N�^)j���Ĥ�u ����Z��]��Edc�+M`i �CbTH>�)�i4��s:���Q�^����O"����f�B���E獖?z��$�3�z��T��γD��<�P��b�Z�\�q0emߍ��S۩QB�u�J���i%V�B6�ְ�I�]�+Ĩ���~�T���.֜����26ʁVnxʠE�f��o3[���6h�r����Dj|�߱���P�dl��0%ь��Dk�jDU��h�f���{C����H���}3.�܎yPX�Z�r��5����v��#��dkwa��l�P�G�|����>�>���a�G�z^#�x��8�_��#�_��ֳ���R�;��y�('�{�	�: �w���H���R����y�l���yMI����#�3�:�yA�DUh�7g��^fA��M����ﴔH�)����?s��%�}�#��9M��� Ko!��W7�J�&fs����?�
��:�;ȋ 1:m$^B5C���/-mv+`�;�`��͉
�K�q^J���T��wKv���@;f
�� �t�ǸO{�:��gNt�Zi3�/����[�s@�"0ɶ<�R�ap��8�w�(
7h��y���g��ʀ��^����;6^/
L��r�lꮰϴo�sGc3���p�P�������65T�I�9���j���`:|�Oٓ�NINx�/�&�8���y^ؐ�d#PTT�^�}!:����D
��F�)��"���W1Y�q����Y��a(w���`'�p;@���3dz�������uQ��L�i���pc�fh�)Y�����]H���q#+ڔ�R�g�7����QdC�>��͟ϧ��|�㸤��/��'��%# �eB��&��	֨�۶\>1�d��������?l>3�v=��s8���P�͠xj=n��1X;�hW(h�f����yL��:��y��l�>���g6%�*��3��Կ՜Z_2�{(���    w���3̴�5rq�*���Y0�A�Y46Q&�Z	��P���5���J>;�Ax>-۬��B�f H�9|�sV����!Q+��-SR��G��1�y,0&W�Jr��G-v�NQ+���L�Rk�5jQU�������M6n��
�MV�)n�q�0�,�C6cGƺ�V�V~0Vک�5l��ɯzd�V`E����^���ֲ�#�r%�j ��c�V�Ma��ݾ��FJ��U~AaBucY���o'?*����R۝�O��T�h��(�6	�{��$��1P�d��7�I�H��2�v�dx�&����~����&���Ne6j������1&9+���q�B+��S�[���ڊ�J���(s}tܒ:�Yت|<0��j�)���2�L�����Qy8��F�T)�H���0Ʃď �L}4������WK�z�ɡ�8lOJ2PO�G�C�-�b����#�ս\jr/��558�5v��ӻ�hИV=�CQ�)����#�;I��6k���z��:)��v���4�Q�� �Z���F�OeÃy$FW���g�zV��F/VǬ���+�Y���� !��W����fJa0q��i�zi=d�
�3'���᮶�I3�&�S�l�˱�Jc/��^�
�eYadU+�����y��8�-��t�*�� :&u$G��B�"�iԯ@:�vN`�������1&��t���������;�q�P�j(�sM�C���iU5~7ʥo�N#�D���uU��4���*PGGscD�hh�tk�;�nqT�"Y:�U��<����/e�lkǸ࿜����m{d��zd�o��(����H>�a���������?�h�G��^���K�""hX�a H6��9>��js�����>~��q�)ݟx/���������}?7�&�4�ʚ���><h�J�T���=;�E�M~#�\���u}vQ��w����������wI>;A�0v����������y�@��'�z���s�����V& �ag��M�ƃ�^��!�4����2�[v���d� �5�䫃�#�^��~/{*��s���vxp���ӡ����Yv��#�,��ŝ�>ӡ�T�!��yeVN=�c�EZ�hi/��CyJ�p���=!�S�b!�]�_�cz%�3�(��%�G�	]�an��d��H�?e��f�=Hy$��b�(-�X���Rmvf�]fyip�QW R�P
6�Y)���]΢�TZ�z��_B7���?E5O#;$��񽗈�x�7��s"�hy��[1�T��@�3�#R��euA-+o��ŐƎ����*ah�{Ls�4k�$^	7��m�|	�;��k�����c�,G�����;�qr(j!n�vV F�����y5-f*O�����p�#fÛ����&���n�p�� �tjʷo�����W���MX��;U�p�,�:S�:�`�x��]c�e��ǎ���$���\�i���ӗ��u� ����
ݖ%��'��<�c�m���y.�7��u0�) T9���:-��9g{Q���>U��ƿ��Ҷ봘l�*2�TIȆ���4/��jD	M:?��yV�>�Ii�J\�Sgڎ��IZ��Wo9)Ia�DUS�-��jj"{>}��2��9V���	��lU3��ߔ����fH	vT&�!c�Y��NJ:�L☝�طc�@�\���1�h������E�w����1NJ�w���|��;��ZW��'�e8uu�q'�k�B��8β)8�IFIE���c��ܤ51�����٫!��ޘ���kZ��m��R�TshU��i����g�I����duǒk��5�:Z老I�tf�>�Kb�-'5��g���W&J�&�Q�Y��ʶ+Z�N�rp;m���Qg�����%s&:�jf�$��%�z���<t%Vʌ����r�H�%���
T.^ETq�<D>���ܝ�tқ�{D����P ���)�����o]��MD~J~�ӫ
�@7Hcddt�TI�������{��c�+U�io;��q3�
�&G&�f��*)d=أxh(�{a4��}�'���;הA�ʬT}��������jV��xM�%�U��-�2�^���ڹ���E�S��cZRO��.��=
t������
�!��B���޸sO	dX�*i#�^oۉn5S��~�=e�L��wC�+D����c��S**�a�u��v�g���x�N݁�rB�r�4'k�<�z��$ܹ�ģ[�#��Aq��S��*�1|��C�iԣ����P��P���ef[���z��Z�ǖߧ����Jǈ��f��M�4%����6��%qY9H�zC�J���Ih9�<�ll0��4v�ݘ:��;i�V����NZ�u����[ ��]i��f��~3�^�
�x�	���/�~ȶd�^���ޭ>���E�5p�<�i���[���I���?��ԃ�5�P~�S��t��� ����33$�[l:��k����^�م_*����wg?�~�=����D�@IK%;���y#i�Km	����E���������J�[�P��9����]�52���2��8X�А��-k)/�����N �Ro�Q�<'��1�"#9\tr�5j�%v����O��_�l����z�>�����ů��J��qh��r��Z��Ko�\wH�R,������RkW�e-�R�0w����p~Ѻ�� o`�mу*����H����W0ŗ^�4UX.�F	r�=+6�A�Hp��j*�o��Dc�f������屬�WOB|a~���	�7�78=n|���"��~��y����5���Aф��GY��]z���s��T|Q
E�R�0L�����Э�mX_1[��.���v�ќ�����]6��2RsХ�������4����������x�0�U�T��!�G�ARo{��{���/.�<�x)eƾh����9/s�sRa(�{B�ΗN��^q�ǭ��x��z6
�j�b@�d'�*KÛ����M@Hϛb6T�\�_sd���~mD|t��o��9H�	��	V�^�³l��O��B�z����x"-/㚅��XG$)f�}*/Rd| � >D�L��)�L�&o�q#u<b�N��ݯ~]���/��y����gs��V|Ƚ�)�v'�8)��qA�܈��ھے-����6CɀͿ1{V ��Ě������hr����<K������щ��>�.Q�̘��x,@w$�������:ዟ$]3���b�3�(�j�?=l��GIU}k:[$-̊�~��X2�����(ΘE����X�O�B!R>��e����O��Ƿc�?^��j�s.�,�8F�)˯w��>?H�iʧ��,�l�����6��}>Jw"����L�����ynsRҾ=��������u�^@<fȆ�,�ad��:��+:J�L/��}V[��d�+����	<������	/Q�8<֯��	�9!l�p��Ͻ�dӀ5�i�h�G��<p[��Zi@��W�CJ��_�m�&��x=6/D�Z
�LE&ii��b����|CeQ��)�v�������U�on#��sT�]��l�0��?H�8 �����g,�W���oS$=�E�p�eAY[�����j���Hb+��ұ�k�Z0���Iv��{�����'@��ǲs��������{�F����z@�#"��G���,�Z[��.��G�e��9��.�Y�*F�I��I���`'�|yj㴩[Ǘ��q ��`S�
\�4�U1���P�r+�]vQ�o�ґ�X�ZN}�a�lu�oUi2l|��m�u;=��62p�ڞUۭ�C �4!n���6�8ʪ�W�4�@]�!��Q���SM����y��ԞcYqRz��+I��VW��� j�Ak�挦2�e�̫�`y9��'��#Ǔcbx�����@�[��y��$��䐹�!����� ��(/<� ]Zu���2��P�E�S"�i��i��Lڸ+�� u5���$63P}+�Z�����VY{�@3��FS�jW�    :yz��3�2��b�i3�5�S�v j+q��'�l'��WXk������?��<���t(�����@����Jݲ#\�$n��غ��� u܆X��ҟ"���Uc�� Ե��M�k���[�g�MQ�{�����W��lz�2;Q�;��K��6���}!��ҭ~"r��_ŧ��n6y������>mi�o�ڻY�e�P���'��G���8�Hm{5Zg���M_�{W�����[O������iH��8���R�T�92��V�ytd�� �U�˾�W�����!�t��JÁ�*m����lS��\UG+v��ڴ��v��c����M�,o>}���z�d�6�u��-��^�J��zk�ڙ�MVfhv�����&�||�6�G��"%�G�����c%�G���/3�B�Ӊ�c��Q��M��M��ĪF;��̱�}�}��fM/{��^Ԍlch%u�xz�T����ʾ2�q�(�c���V��*oۨ�1�Æ����Ũ���P,/��n}漒ȫ�>��0g��G_���EU<��d��4���������^(O�ڶ���f��=�+�,�p.Ȇ^0?�)ᲆ��)?���ːu}/n->��>���Ӈ�0/���B0�[�uS�����k�=��!��PV��1*VÕ���DIHx����"(h�/�f(�˷sZ�u���,#�V�e��/�o£$�u�;��~�'Y�rv���}����(��	G)�NH����D`.�ru����.Z���xE�l冹�vҾ�(�y!n���1/%��6��3�<�Vz#c%��*�e���l� e����$�"
5��0��zģ�v�l���؞���P0	�����F=WW�91�М���a�lv�B6��n�&o�JN�8����%X[s��~��~��I:�6P��,/8Y��	I1
[D�xiY˓�y(+� �r�f:�@f2���k�:������v�!�s�Z�b���0���[m��淗�ۨ�qoK��hV��`+4�׷\V-e��"��kƜ��{7�(���m$������P�g�\
CzE8�c����S�-�|��tI��F�+��Ey�3�3�=�8믁\�s��ww7��y�+嘹�AU�����g�C/n/�(	Y�-Ԋhǚ��������
H��qk U�����xիsɲv���Z|\����;DG��(�%鬩��$��M���%ߪ���� B���~��I�m�c��G�zOܙ�������������J��~��8_�H�/	��9A�U:�6�x5ϹW��l�?�H7��=%������Lz~s������ۻ�K��竳7�o����O9v$�.ίo�����1^����/W�/j�����u0iy���h�@`�[U�������I�n`�7��-h.�<����� ى��Oy�aNN�$ w>[*Z�5�Ó����6/�V�eM]�N��2�ZbW�K�q�H���9B���i����O��q����qZ��P�2�9�d�s
O�������T}S�s�+��٤7�G_m�ךj��2ʃ=�QP�>�+M��y�TZ\�-͈��ijD��*׏v����XM���W��d(��φ*/�
��(3�����i�꺉MlO��(,�O _���lղiT�G�3a��?�
GR3�	5%�OE���g�/�F��#��+ň����̌�_�Q��(N��$���!�?|�P� ���h��l��j]�C����Ѡ�f@���Hp��_ ��ь�1(c(�~�Tɭ)������ԩٖ�����Z�q�E�+LfF�i�A6�.�q�<F>N��M�J�}uDݔ�;���l�6�r�n�h
�x��\~rx'�����ih�J�4}Bw��i$6t��z���3�^�sw_��C����-�=cu�DͰ�����w:�4��w-�%C�}�c���v&��*�N�;F��)��x��f�reR4��3i��C�� ���;�f�X־9�%ɧX��\F���5q;?qL��LO�&���<<W=��U���'d�z�eS���Z�'��3���ު+��K�K�����OqIm�%���O�.�C���h0"�Mbv$��D�1٣fw�y�c&����I����nU���嚁����7e�t$k�f���;Q����Է̶1M�H-;�wSEf0�:�+d$F؁<C\:^�'O��TFɬ��C�P� ��:,ٺn�Dl#GkGMn[��sMS��4�aq���b�>!��MMP�uY�C����'�ن�qI[��V�t+�q��{��X#i�ѵ	E�{l�1K9U�=q�c`PR�j��a��v]c��u��de����J���P3�q���3�Bu\�v��n�7��i9���Pۭ�(���|��T�Yn֩����>F����ܫ�z��3�C�1�UGN��k��U�F�r�l;�@������{\V��%��سR)�zd=�/I�FUm[K�+�T�v�C䖣����ot-@l��{{�N����+7�c�J<6zdxՈ�vVv��Ǳ�����~�LCo��L��CV�I�(g�&������b���Ql������ְ�0�P?V�t7�{��m9m�'�nβ8�ݢ�]C�=|���W��z��eJ��D���϶:)�Ī��,s뾍]#�Ҧ:-N�&5I�I���k�q�]�y]���t���,'��N��v��$��$����C�xp�2Cw�p�	�h�EI��q���{��P�y�gE�Ĵ�ʶ�����������'�M�Mj �-��C	�KI�2~e�����X�u�.�^��uK%��O��5p}���_SK��5���Q]��פyC��"�)����P`)�b�
�Ow�����z�wnp�B�F~�Z޳�g�Z��"dw��{7��I$Y�Uq��'��|ZG҈!��_�<
��W�Pn%�r�	��|؊������;ăw{r������ �� #�� ps���b�\����A]�퐷�eg1c���I�JZ��K~�~���F��H�Ȱ@ʬ�|LX� � �����c��0+���-N#�����k�nj#�@�4-dDB�3#�_�_��ùn���5�yŽ����1�)�v4Z��G��R�c����	�`A(>��{�]�X?�EpGA���DϘ�I D�W�B��M��� �B����9v�1�MH��?6�1|�I�"sT}��!��Nb�>џ��%�tD��B���?_�F=���2��+O�,�ޞK߽���)�6b�!A�G��>�
!*�!��I������>��.�����SE��!����P�W��K��:C���c��;�Ѹ=�]���ƺ\�Y��b�o�o {}���ٝ�H�E�� �s~��I?�xۉ�1=��z�{'�N�O?z�Q�I��*w�M�cLAO�(ǙUppȩ$�����ݫ������t{�����V��~yͶ8�-=⬅󛳗�W���L�)�#��S�ͺ������v������n�V7ҳ�����ٛ�Rם/��ss�����j���t��buy���%r�|���ժ���s������k70"!*d �y�~z{O;I�Dp�B:��}g�f�ud(	Tb��j���Sb�y
�����P>�Z�/�h��l5;�:�sSNp����{���Iu�]H��hQ^�-5�OZ�Β���|�t0���,��gii^���M�<PȘy�b�^2��(c�=��5��<T�9V�cِd�Q�£1�N�;�d�&v�l�aL�2.�I/i����;I��A�(�D�{4�ʼh;=��|�A��cL�tr"4N<z]���7EC��1&ԩ�P�YI���G�eLD����J4��NIk�Mߥ��X�D��9)���R�ioš�	�D�Xk�^��/��g!���0&2���`*~�5��%jU��g���JVNc�8��^�V�a�	��d�Ws/�ˉ�|�1�v�lU�C��A���0vz�ʘ���Rkns���z��B�='122�sKSj�R��,G�p��*���MVf���ic|�1a�Z��AEu�hy����U�%�    `LD���Jd��<X��cW���$wi���6���hl�����{��C�üu�B���}*�E�<h���jY����Y��f�ض�v��'|�@��nf5���m5��M]m��7��\�]�ِ�4����#e}`t���e��!��&��2�ao��+쎌UWSA�q��������9CZ<�R#��d�aot��jZ�:�}�+��v�j�'� �d9j���m{L��Kݒ�]8,aF(y�qh:�W��t���~(L�Mi�[��#3OHg�JK�}pX6�j�A�T��ķ�zJ�~4��95�[��=���MM#��a���C(�'5��ukb��pXW�^U��c�Ʌ߻(���aR��F}��Y�5v�,w���AC���ޏ�Cv�ו]�@��_��^�^��7��K�Q���{2��@ ]�D��o�N<��qN�!Z�����ǧB~|G�z�8���:2(K6}.¬\����͛�n_�	 3$WE��J������8;Z�G�ܦ�`/4����8RE�B����U5�G���7��L\��\#6 4�J>pʡ0�4����f�3��h9_�zf��yQA<h}Ӄ����7a�2g�L��͸��yy}THP��H�3HWE?K�������B<s�,�	0��x�|Ho��ޱ玤�w�9��G�ߏX3@T�<��<3��F�"~?E�Tz�
ѱ�s:��Y�lbe�" Z�)4�Nwl�s~�DI��\1Iτ���v4���s��aF�O�T����4;��ٰ�k�O=/R��s,����'K�R�G@��S0k��O��\�E<�rg�\��2 C���e�l.�N¿fle�teo��I����X�Bx��s�嵸W^G�.�5B�|�<[H.�)�x͗�����A�'�"(M�����g?g� ��F� �u�aH��{	S���tW�U�1��<���l��M7sŕ�Ǌ����,��Т�R���̹Hg(�����.ګ��׳�-Җ����J\��Gco��0[����l`&4xh�i@���*6���(``��k|�ׅ���x�.�_6+�
S�c�T>=� �9���fт�R ܛ��BSA����7m9cq���>���x,rR��9Ί�4B���ٖ�a�߈Z��*q�\�R�k�Dn���e�i����~tl[�v]Žh�^���� ��H������>��	�[K�ԗ��i�J�N<�'Гg�@���#��7Щ��G��㫠�s��X���ve�|�`�Gw�u�#Yw�j%ִϠX�ѫ�Eku���n�����?�]�W)۹�5��fm���M��Nܦ����6�
Ͽ��o�x �Ż'�U�=y6㠑��G=������"P:��C�O�<e��O�5N�M��ӹr�q����q
8ks}��7{4pB� ϼ�cg`�Be<���څX�4�2G�o5F��^��Y�<��8���ߟ��Kk��خ��f�v��T@��y?Vq�E��\C���2K��P���Ӭ����/5�[�^��s=����� ��u�	'�z��]�A��YR��k��`f��4Z4�n��B�"����\��$�=Ba;�zµ�Il�ǥ�ٛ�p��j-���Oڤx��2���-Q'�XK��0[#��(!E	�'�G��G"J��wI8����}u!e��󎸡el��o5^NJ�����od3�Z�(�]
o��T#�Q>��̿��3����ۤ�<v&mZh�O���rV�f
�P�z�?��< ~��`�=�!��_���lt���
�S�Dz����8 h6ؑ3ᐰh�q���cL�>,%I�?�$�e�� @==�p��q� �wH��_����y#�����,�þ���堅u���͂q�H�@̜eF�[�"7B�R/Bp^o빳7�p6��V
��J;|��^���ϧ8g�O�-�Ov@��|>H����Re�8V���{6���9����Бxt5b!��)�ԧ[�ֆ;fH�w}�-&p"��;��	�6|��\���Q����ek#[�"c�"��pGM�+ � ���l�0|h�B�{�X\�d��e���
�|�,�}s�z�zu%ٻ:/�.�F��N�Qc-n5{	fl򡅍���HIK�<_��Ts��?L���#j�&N���O9��}��cC�C�����t"����8���3J���&;b�7�e7݇��^���}5�Tn����q{l��7���V�p�&e��b�}޲�؁�F�I�s1���;�plr�N.�
#�*�>���U��j����6���T���}J&R*�E�&���N���]7<�L�Dv��/k���3��A>v���T)?&��Y��0v��M@'O�؎I�R�Y�v_<R��VQ�$a�*^�(���J��}2q1f��J[����F훰���[�����M�Ĳ�W�1v;N�@����f�Z7{/Ұ��]U�Rˏ��j�X&}ڕ�vG?Uܲ,�&��r"Y_[�ٓ��^��C�[�GvQ[�t-v�*�^����)dF:�9�̭ڤ�l���+;�.II���V�T=��Fm7[��zu쨶ڥN��Y�C�G��@��I��Q6(�`tSK�B�w��L���-Ӥ-���������"��`D��:3:ݷ�$H��%���c��9:��Yt,"�v"�E{H��r�ጠ� 6U�4�����#�ɘ*V�(�c�*IYiӞ�˃��m2U�N��k�6�+������*�8s��]�Kɍ�\�Cc��,���#�ҁjSl8}����8�Q_Zz���WrГ���H�~�Ʉ����hWJ�ia�ס���5 ���(`G�8o5�(45���ا7}���M��n�є��(r���5�铒-K!��*lop���U~����:~��Aj�I��[��]�Hǖ�!@���I6YS�kVe�z�2̃�"�(U��-�d�N=�}��(bT)ќ^�L+m%�ĕI��� ��)h�ɎݰՋ4sq�e�=9�TuM�D��؞�J�lWP����GN�i:Q?�:�UUI>Z��W���js�<�rp�[�����ܤ�
\��(����|���i���(�$B�7�a���7K���՝t�:;�Yzq}��K�V?�I�_���[�HW���������{��嫻���<�Czqsv�����j�c��q��_������BV7���g�?J���������{�EC-˶7b�//^|��c�}��8(�1:�q,`��XD�0MS[��������̓��_o���	��M�H�T\�a����݇�����my*8�R���s@�S�L�|�(�Q�f���p�[9}}~���Rw�R {����A����K�'i�ytE��uZo��d�D���}O:r/-���Ɍ9�܈͏�
�P�)3y$�7}�S����k��?����U�?J�����1;>��\�?����װ�+�6�?	܀2�`s/H�Hox���d�5?��ҫbN�Ml���Ƅxi6�t��'peo�'Z^�%eE�5�..������|�y-�ו��ɹ,9+e]"E!��p�����h6|�R^��u��B�<Tec'kq]����l(hB����}}i�C�B�zf^�^���P��2�4˛�5 h���^Z i��F�X�u�^�/������?s��Y�s�`�����v7-�� �4��	�I�	[�{usqy	������y���ҳ����խ�z����g����˛����{�Qoog�|u{w�����_!}A
��q��}̚����A>a�w[��'�^K��b3�,|\���13
������ﷀ7�\�w� U,�d)�{� �,0
�0���%���4�v^ :���|�&�����I�q� �����@I˘o<�ĝ���h��6'�yS��݂�B	�$�&��l���p�g��㈈kaId-B,��B�-׳\D#�)���i��9�3[��; �9sY��	K_]��������n��//^���װ�U�1$�>��I��c��}�\���;�f�X�!����7���ף��t�[lL�!�y(o�rX-A�s��*    Is~t��m����{PXZꅳ;�4 D�x�s��]�I�Z$VY&��r�,��%��@)���F�&��Evk��R^FF���2���wV�Ե�V���6AD�J6-��7 �i;l�@��<��O�⬿5��Dz���@�Ő.@�-�Y���)�遡|�o�(W|J���g2��h����i�D3�;r�K�Ӿ*���a��a?	�ʼ����׹[��2k'%sG_���?��w/��J�mh��5���?@m�|��uSfO�eӉ5iN�Sc��)F���Kn�#Bl��\y��IQ�{�l'B���ɿ�XWJ0v������*6��e:/t��_�9���W�fK��BK\�`�Xv&�E#�D�V�D�z���6c�ز��gEV���aɧ�<�Y�c�����0�7C���`����O[���?��3V4"�ʼb���7g�l1_�U�oX�Ӏ���d�f�٢t!�hWc-�TC1[����k�k�U��q��Y� ?�`}\�0��l��������Q/؂��Oֹ=d�=��hb�Y�E�\y�8t��6ը�֖k�����d�S={���4��H0��f�uo��X4U�R����^��m�j�8����&�.R4�F�گT����{��́Fj����#���ǲh�!��߷l���550����uW�n[]��i�`�-?,�;�[E��&	�w�ѻ�gX4�N�B�:?a��2�iVa7H>�E��Ʉư�,�t}��u�}6���.��~�.m�
�F��,�j0k�I4���״��&JƮ�'�����X$�ٙ�r8��UQNu��i��9����,��A��+�<�Ws��N$A�=�E�9^�ؑH��J�"�Z�;�͍[�ZJ#בB咐�OB�h�^�B���n�A�4Qw�uE�I6�>�]=4N�G=N2濦��#���O<U�Ü��0��ꊊK6A�I|�y4:n���m�TQ��vUOHgj�����J�Un�EN6�J�)uU�j���*�@��������N��\)Z붞�`�W�q>25���]�S�x�h����'yh:�<)n3�W�&�M��l�T���w����_���g��P[���9j��W��
��R��d�R���u�I���+A����;b�t�jQw�+��J3����E�gȞo��9���+>n�"�v���RBܑ�-w�+j=U�0T�뱃��KO#��E_�h�!ĕ!�c�71i|�"�a�N�)�XN�%���i�UNuR&}D�B�?��)�iH:�xc�U���#�hC�v8��J�##��sqԔ�#�+��:�>�C0V�m��h���p�E*�p�V�z�n�J����)�����Tf�N�%�������}
'�kԩYRvi9�2n�����+�V�v��?E��R�b*�o�l��/��T:K7���"I7���B�Az�C���7ʊ<����Ur�� Q[k�v�K��Q�G��y� ��� ��5r�ߠ�K*㢥9�S(�A� j�%���}�I�rH(��3��(�����wR�^6�m.��u!u\�1 �!�`|�$Z�e-���{
D�߉�342p���E�
L�ǿ��������sfi�Kl k�9DL��>;�@�]�`$0n�R(E�ȋ�2�#!j��|�8��<�� �7���&֕�L�"��\��j�9�����$���w�`fIwic�k��M6Be� �'A�sH�������f�i1w\�0�I�;�%��p�#���g룳���4\'����r�Ɔ�6Xz�Z�|��3��B`��XMFsя�.��2��5%��ĆP���Χ��B��C�9Ts=�q1W���{�����F��޹�@��\�����2:mK�\�uC5�*ů�i݂G��&�m��,u��~kg��-D�y�*϶��2O����]f|�z\��h�K.)����%�yN=^�Y&��*�Z�r�I[���2����s=�I����#1��kS��r�P!�7@K|�.
��z[���3�[�w@y�{���A�̒�,�=k�Yh�,�;x���D�`!�X�A�jy�J
�~�H)]�S��0��$-�Y�:˖0�g�'��?�޲с{2�5T$��G�ZAh�E�o�����"��2���d���`.�,*�D���.r.(3���D�I"�+�ĸZH��E�c1��s�^�����s�2���xt���jcb�
%jluf��=y�yu��/慟�E<���2��`���n��4G��ґ��湽,^g�b=X���jst$�)�^׬;<� ���g8p-���f,�>� H���lԚ��DT	t��T�\H�E����t�hpj�3<�����'�S�=��hJy"D�fՈ��/
b��_��.�H��*�mgm�`����R�:�bȼ�.����%YF{kޭ_m*�|ʰ��,���ylY��vk����)$��j\�]�)d#%v��W@�9P����b��4�&�c$�G��y8���%J�V&V[��l3|᳥'%��ƈ���Vj�r]�E|�[*��r����u3�V����I/�1[}_�j���`WyBD4xᗹ��Xo1��ƯYY˦���r����<���^����
����{��<EV�E�i��#I�y���4�{S���cN�.�	��
�O߉=�9m���U�� �w�ת�J��S��Dqd]�~�����t$�L[�_o����G�����5@�-�����}\�{�8ʍ��wx����O�!�J`���Զ��Ǡ��~�^�~���+o�D(OM��%;���,Y:�;��4��5PE����`x�>�}�~c�1�`�d�-E�5[��q�g�jI\�h[d'%
�f{�5oAߝܞ,�L�3�wb��Y�7B��f��Y	�L�oU�s~grɃTh5M2W��%hN��Խ]��W��ZR��&r�әO�B\Uq�'��4$�3�`�q���Kp����'�
 �ǎ��
�� ��"!�)��[�\�o�AA���Ną�F�*@��
*�Z k����郢��6���x�|5 w#k�OX<�~�u9uB=����M�t4��<39��̌ۘ({��U�QF-�Y�Y 5�n)7JJE�pG9�Yr�5MU:t�^�L�L�;i��Ǝ��U���#H��k^V����sE�s/u"�C��rۙ^��U��a7qK��T��7TU;r'����|�:a��ڨ�պi3;�lw2��C��:���QeN�Ǻu��� ��ڊ7�C��n��U�9�n��Aԉ��81�x,���1�&�9���"�\�R��4q���?X��J����R3�]w"S�m=)_�N�b:}�Yri�T�<�p�s�/c[(8�����}�:A0����b�y19j��e�U� �
u�Ū1�bź�u��0�V�6MF���]Qg;x<��G�{ʤe��Uj�
�����pM'�'_.t������!{�jȜH��r�	�i�����k�9�1O��<)l�V��{� {8v�̜x0��!<X���*|�L����;y6f~ժ�M��R�0��H��q�f3�}g
Q�5؍�~�:a���(VR��="%����3��H�xp��y��Fo��PQ�t�@#c�;�MIةf�x�7���x���݃ۇuL�G�����܈9�h";�	���H플9vڨK'3W��8�:��U)�M� ���a�K�0��%q��������O�Q�{�Y�N8Y�de�;�厮�l��R'b=lݭ��R�0)�L���{7���4-����;�m��/6Ց�^*������w��q�Q��;��<�ɡu]fU�h�'�6u�i�29����
��e�Ty��5ۓ�	�u�iI�R����s�a��b�ï�6,�:���B��M��2|��-�"D5��hR�,�Uu�er�T�Ƅ�F��	���ڢz�S{0��S�:�ʘ�n)���7��Z�*T�Gզ��d�����x:&�~�ģ�"G�%B����/.��|V��o�u�    R;�'�tJ;OLzZ-�'��)��Ɂԥ�K�S�4�$���М4:��^K�|�%�:�1�toӭ;�6�ݿ��)�d����x�/���e�(���!��ŷ�m�o�����@'U�K5�K(�_��Y/��B��%�\~w%��ʡ����:-z�<��
>�iG�tF|���(�{�������wFoE�r2������V��6�U9�g�t���X��(��Xzq�T�Ԅ�Q�@	� `�M��F[��^=�%�N`U�$&4
��&%B$��\Jo:Z�AR@�kD8�̚�7rނtNO�Q�L�E�5��X�.���*��|��%���Yq�JY'�x���<F�y6��Ah�>��"�Փǘ�6G��Nz�n|�y����a:y0��3ş8� ��"��Z�%����'�h(���
��k�u0;�yr�؅�J'�ڰ�Ik�UR4s��r�ɱ<��~|5:+�C¦4��7B7в#�i+��b�,���޺(��(�E�,{�l��}1w��)W���%Y�|)*2i�D1u��:�w�
-����W���Τ�o.ϥ����Igo���]���v��$h`����b�Kף}S؅� ���O�1����E��sx ������׏B�3�峷�KP�����ypiႶ>��m�/�rs:��(E ySd�E�C*�K�F��4�Y��"�������T�[���z���݋ I0(Aܣx�ng\� ��-\\e��}u~�3��۵��������G��S�|sq�b��nu·�G��bk�<�Ļm�����d.�;�����/���'~C9!�c"�o�H�&���B��B�Aq?�X�7XP"1PP��������?�3����� ��z��h��|�M֨1�غ����HX}�3��������r�'�#
#v$��#AG�
�l{�j	ްm9��CR��y-�ά��F����k����(�ܔ.8Si�c�cK�:	T57���<���M�S�	�����>��������J����\��޾�y�^���BLAFZ�=�H �FH��y寛%���P��Kx69Q!n������\l������9|9+�V��M�	2ˇ�Y݉�mV
��E��ş�:�(ĆZ���Y��L�H�ř��]�~d�;*�Gۤ;��a�6|���<������%(q'�ȩ	�J���^��{v����R:�:�����7��;6��ٳ�ww���B�E�����pEHAjZ��*�6���[ �P������BjA�����Ά��ۣ[�t�Ͳ���f-�
��t�)��<�CB	|���4�.�c~�
�p�A7A�H�*D5[Tk�:Ǘ��y�k�ȇaE���\��@u���@}μN�t�s�~��O���ۅvȺ�����ryzʀs��O�Rĸ��`s�[O�RP��l�c�z_���)g� {C�?`>�#��R}�	�ԏ�^\���xs+�ݬ��݉��ٕt}%��-��Yr`]1P�A5�m�̊ �RT���>�̷��kKZ�-y�%���9�{�K-�~ ��-��E�h�rr9:\�3�j�/Z45\]���,d�ZxK��yc;o��J�'C�5{Mx�_|���_�>�%L\�r�c�O�}�m��|�������O�h���l'|�$U����suX)3[���|ءy'�����)K��/�I�o��|�eu�{��dO���s@�<�RE��|:]�co�m��F�NL��	�M$��A��'_��R6���o��3��(�WuI��~Ë�Iz�C�:[�ŧ�FG{����=VП��y8q�#ݞ��]ќ>˟#X���g��7��6Ħ#i+����Т�\D�fK�'ѾDD��!|�o�!���P0B�w9N�}��?kԭ�H﷕P��Lٞ���Z� ��exf���3ۭ!~�]Sk;̎�������L[Q��ݕw[|+�g�#S�/U�$)����Σs"��L����M�܍]��$�#֔
�o:��ت�u\xڣ(I�=z
������뉛kn���$�5�ġ:uy��5u��q�$b�N��}4VyRd��RU�KI2h���K����m��(��O䱔�@�3כ��sâqY�A�	JҘ(�j�G���jg�JZ#��$U^�9�����k��"�3���qq�����N����\��m��#(I��ԑ]a��jf(K;�%������b�mGת�h�,���PJ���CPuرe��Ǵ��$�%�NF:�I��r�
�K��Z��NIB��-�P+�h��A,S�2%)���r��t���_E-e46�T<��4�ZЗِ�:vL-��6(v(I��izE WVex֤����ݓS�h^���L���qG�`t�%i
����)�*I�X�?��sIjT��L2��Qok�%�%*��%��0Y�S+j�!�JI��p�
�Di����Z9�%i*tśش%�+�X�3'5d��C2�L��Ǿ���Bc5M�v8I&�*���^iC��Aכ�S���ġ��,�h��YҺ��9���Ib�*i�jSk:��M� 2�P]�$�'SYz�Ě���mu��4i�O�ha�WpZ��sp����s�r"��];�&un&�lg��$��5EAD۬s�Uvt{ړH�>'�]�*CoL�R���u[�V:�R����+'ŞF�Ea�ڲ�U�ݝ�)I���>x��Iw�A�|��D
fđ����b�>iS�M{ȏ�S�Ʋ�K-��P��^�� ��]JR��q�r����3Z�&�IR�O@IR�W�>��0N�\u�1��Q�L����mĊ��9l鈳GP�&?E�329e�i�N��3w)I��W^&ˊ_4F�SQ�=N{�˃)IAe�I�'E�}��I_%�(I���)W�6�k7�2�����e�3+I��{�7}�����N�E��A|���~�����[M��qM��I��6_��_�w�<9�������������U5�V�W��^��pA�.�>�w9�a�6c͇��I���dY�S��%�œ_��@Z�1ED蜉�9�:,"N	Z�hD�:Z2��8,N�� =�?����H�w�)P�? &լ�e�"��ڏ�J<�q&#���>���|	�bV)if�Ƀ.����&dwD6c������b w�! �T���~#!!P1^�>M?;�7z�}~ ��'į��fm�s��oݶ�/y��ڳm�p��Y�z�k<a�Z��K, `3�5g>����ŅT��ضf�E $��%�2�x����D��	���cG�Z�+��WH_#x�+�t�)S[��
5č�v���!���`�[�X�_�lx~�p�:\���~�2��D���@^�tlk�|�d���{Q߻��ۀѩ��;V��na�ѤS�չd������+J_շ�f�{C�5I8�tG�@�-G�rw�����e����"�W��?~#�x$�1WOɬRs��	S7�iu�i_o!����Yϯ�__���ח��JH��ˮ���Kgo�^^�nOf��k�%��I�Sgk�k6��";��
�	��
�9ϊ:'"��+L'Q����!T�uQ]q�&��������7�o�g1�Xt�ȑW���وC���e����ߘ�P0�1��{�ܰ�9��WE:�G0+�`/��UE�7g�__]�x�:�z�����_�����!���t��o�.nV�@�z{y���e�9Y�$75���������x�ӼJ�������ju�J��Z��h��W�w^�����t{�:{���Guyw����^ެDo|�����E�o.^^\I��s�8����v���يR����s�����W��g�s!W�wg��<7&���s�ϙձBn�_����+\�e�� %�� ��yw{�*t�Zdڂ��w��v��/./��W����!����������wg�"5(|�e�~}s~�~�j.��������n.������n��N�o�o^�c����n�Nx��������q�Z���N���ju����c�AK��JW�W�w7gW�/V7g�.W3Yw���E��W+Q���
NT1�>�Y�������W[�#}w�r�����g6�V+	� ;  �Q,^�S/"�X�<X�P��������{���~�i�އ|y��Nexǌ����s��B���Ym+b�?{ww����sfF�>Kag��`Tl�n�oX���|Ά���ǋs6f�n�=/V��X+���7�l�YW7��W�f��nլ��R��aD�ڭK�Y�A���	B�gw�nX��0h�t~�3��4��[^f�s��N<|<�ƜlOl��� u��A�k�ϭ���5���[ѵ�[��;�{ni�����,Ψ(�%8�{�Y~�H|����~���|~�����i]������K��̧^�d���p��N������F�!      m   _   x���1�b���%��l�u��I�e��ՙ,Mvq����)nᆛll98r�]x�Oy�%o��������4b��U�J��y�������"H�      o   H  x�-���� C�P�>&�@/���0_�ČժW�k�V��՞>}�����:�K��O��k�צ'0�ۨ�:.�_���j����+�����7�F?^��~��A�^}��=.�E���+����5|V�r�P�W��K,K�R�T,j�� ��"�"�JXP�-(�[��jŲbY���ȷ�H��t%i�ґ;/�I��+���?�V��3�3d�YT�Q�F>'s����ǈz{1��n�
g�p[I[I[���U�6������![�4D�"rs2W2�1O�3CP��A�2��g����eI�W�-�Sqz�ߟ����t�      p   >  x�-�K��0��a�P��.��9����zc{l�������<��Y��9�7��V�f���91N��D����4�l�M� ���l�l�l�l�l�a&rF�g"���v!��>;��͕͕͕͕͕�uU����.D�/fd��̬����
Y�B4B��Ō��^?`��(o�7�o��������O��?�`q��������|�lp���A��I���`�L����*��>&EM�x�lp���A�w�Q9�� }6����&}���W%�!q~�,����.]֥�T�jT�n��tC]��w��ߟ���7|�$�VqZ�q�UXqbőU�,�쵪^լ�U{��w��ww�]w��uw�]�&�&�1�D`0�&X`�S_eUW�ȧi?DADC�68�'V���	�������U�R�-�(�#��n=�z��p+a*a*a*a*a*a*a*a*�މ�}��í�[����|��II�k��d/�ޔ�*{W�$nI�ݔ�Uْ�b�b�N�N�N�N�N��p���m��Ӄ��,����.��Ut�'�����^7�)      ]   �   x���A��0E���@#�8!f7RY��v6]�	zM��#bU�@ɗ�z�~^�㾽��}/h�"��Jo� @��F H�wش9 HBfp�;
N)�&�d�$a-��1�%5��N�u�a0 H98�9�e�!S���oi;�4ݽϽ��n'����sPV;��O�3��E�j+k����r]��e���_`��kQ����E*��c�W���*	�ʼ��Y#��;l�+=�����      l   `   x����0�R17^���K���H3 ��©����j�V�z������a��Hb��S,��6[��/rD_��:FS�p4�ɩ��{?���g���\      n   �  x�-�Y��(��ӧ$�^���ъ�~��5� �����d��c�X=v��qz���R�� 9�҃�� ���7�:�6�6�2�.I�O��'	� �����\T*���c�8=�l@1Ho���(��q�!:�b@2*&��y���eu��[�z;�_��E,-浘͢т~A��&����6y�����6L�m���f���27ě�l�7���������6)@~�g_�E��hU�*6�hPp���M(�m5��g~xr���a����@w���@w>%l��"PN�O|�1{��{nzΗ|�tirir�����^v��ڥT�@p�8���x���?h�\b���+�8��:@s��Ӝe��_������6Cp�<V��wl���Ɓ�z����� *�?2\������������5p~=�����+<_�K�?�3�t��ӥ&o[�5������Ta(��Op��a����z�����=��3�=Y�Td���IO'=��Nt�m���^��Ϭg�3��yF���3�LS��4\���*�S�z����薏e���g�3뙿X=�7��fd�!��3�E��D��5��C	J�����7�6�*ܿgze�&���/A��#�<	U�?�_F˪+�}�[6�z��W��qG������
x���2�������B0����<�\�t�ew/_@��a��x^�\�4��~=T��?C��jh�T�RJu(աT�RJ(U�T{R�i�Vm�K��x�����t2"�|�J?��W������
R*H`�F�Q�85��G�c�5�v�� �5'O5���ȿo�"��O*?��4�O��K�}<aR���z�c�����>#����� �k����T�R��4.��d�VC���0��xۇ��_4c��鴅�ո���ä0��ɵ��������o=ej      d     x�UP�n�@<�~E~��	�#�B_�*�=��7�H6h�_�� *zό=�5lQI[*���o٫�t$�-�߶BV���Xɏp�,J��^�Ac���K5��]�)�aF��xo��r�/|l�;���bW�(�ᩣ*��!v�r餱T�%�>�����5$�K�@M�)�Y���n�ԉMf5;ٓғ�]�z)�RF���h����b�p�ɰ8sC�}U��K�Vb/�1֎�����^S�5��E,�6M�W�5�'�cgj�����~�+�~?3��      h   �  x�m�Mr1���Sh	U�␰������	6���%#�7`�V�Gr |Z#1e�X�{�S��[7w����䌼�,i̭]��i��tf�L�Z��6L�Q��5]rC�K�Ӳf��m"��|s�u`�휛��L��V酩#y�\.mt�N���T���:XGG�C�Y�F(���=؃�V˪<���E��m��<���׹:�z������|���u�c=����TT�	]2EF�rm��K.m��+L:
-�����cL�"�Tz����+���<��`T1^y�`��� �T�anӬ_G��Ն�%�d��INgPY9:Ghw`��4��H�*9#l�WFW���\��!k����j����2ނ��es�������m<�7�I��,��;�:H�\�gZnxn�Ro�/�(��S{rp���9ס�K��Y�$ޡ�m|Nv���K܅ڷA�ϡӂ^�wR���Ն���(ɻ=.�`q1��"x!ԁ1�nC��7?s�b]�� �_�nn�      r      x������ � �      _   U   x����  �7Na�(*��D?&�_?���wE� ej�i�dJ���}�گ_�n"�9�V���fޘ�ذ>�u��B�B-\      b   �  x�M��r�8E׍��jvJ|s)˖���VI�q��l �0	 :Q�~.H9�J��}�@�~t��]���dmP�et#C0���E�rڌ&賑����YI��-���I�n�U�ہPӲ������A�]<��H��L�� |����Z;��0��>8���DNwҙ_������
:�w�D9��?�"%�ō��c��[���[�DC{ݏFNq�	�P҄Km�Z�t��4��I:��_�>�^����h�z(·�y�����9�?���,-p���1--i�ݺ.�eiE�}�r���H� �ؠ{�҆�ҽ�UHhٽ�!�N�,F9� �S�˷�,���5Xǲ��m\R�n{ϲ�6��iT��Y��:ӱ�&��C����q6����yu;(��S���;ݞX�c݅��r�e�W�o͟��w�y��[��WG�N^�
i�k�r$z��'��چVҏ�H����i�
A;�F���lc���v�8��W��9=X�,�YоՋ������y�XQB�x(�(+*ڎ?��EM�9U� �*�k�"�o,Qc���RЋ���ʔv�,���,��V�t����hXYнS2���n�X	+�����a����9�5=��?�ʆ��G�J���U�
R�.�Գ*�fX�Qv�*�P��[;���`iAF�+��EɳE�]�1ުB����z��U�������2����Y�A�0�ktx�l�;�%��0n�h�`��g52j�E�j��ש=�b�����n�~��AU�\W��p���o_�M��A�$�~p��#l�/��%����r��4���^F��%�o�1�����F���=Yc�Z�D���M$kjzP�M�J��U*�$蚸�3D"H]�$�����H� 0;gQ��
�4� X�p�p��`�~*z�y ���#�)����\�S��Ǿa�y;��=]�nq;��Bf.UD�h�!�:�9�Jwg6��V�v�[K�1Q��\bS ؀�s��Jb��q��-�]�4Τx]��1���:y@W�HU�F���f>"�͟�g��7��H��;�W��M�����t��j�h������Hэ�s%�ܗ(p�?�f��y4��^����-��]8mՀލBu�.-񡤻s��1�"�7�d 8�R������X���1�?R�U�      `   5  x����n�@���S .z���z����4��c0���.��{���T)�iV����FC��b�kjj}�����!�n�(��h�o7��K!�<P�»g��`�!����X+9��МIL\n1e!SXIƈ�!������&g�!i	�b��YZl�eԵ��E����p�<CFi(�dP18ŜXD�Xot�=�޲i�:��۶t�-�vZ�_��o�>�9_�4ξ�z���+��؉FT>��`)qc�_����v����U�6��W*�^�m��W�G�):��O�hϡg㥼R�4'���YR'��H]$$Y��wc8Q.��<}w�*.��x|X�s1��+�<,��k�����R;�d���m;YM�ɬ��m����c��� N烽��ٰŃ��7�W8KǩX��x�^�R�sY�Ձ�������D�Y�@�܇�I�� �������^�E�Y�'�6z�qe�B��CC#`
{?��1�]$�`��з�CrB0�C� ��u�����G��>���#�� :ϝ�������<      k   G   x��̻�0�:�B��wIc	g����O�g���z�=��%�Y��'�<Υ�3��c��?zo"��C�     