PGDMP  	                 	    |           redsteam    16.2    16.2 z    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    193461    redsteam    DATABASE     �   CREATE DATABASE redsteam WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE redsteam;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            x           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    193570 
   developers    TABLE     �   CREATE TABLE public.developers (
    name character varying NOT NULL,
    website character varying NOT NULL,
    developer_id integer NOT NULL
);
    DROP TABLE public.developers;
       public         heap    postgres    false    5            �            1259    193569    developers_developer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.developers_developer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.developers_developer_id_seq;
       public          postgres    false    232    5            y           0    0    developers_developer_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.developers_developer_id_seq OWNED BY public.developers.developer_id;
          public          postgres    false    231            �            1259    193474    features    TABLE     �   CREATE TABLE public.features (
    feature_id integer NOT NULL,
    name character varying NOT NULL,
    icon bytea NOT NULL
);
    DROP TABLE public.features;
       public         heap    postgres    false    5            �            1259    193473    features_feature_id_seq    SEQUENCE     �   CREATE SEQUENCE public.features_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.features_feature_id_seq;
       public          postgres    false    217    5            z           0    0    features_feature_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.features_feature_id_seq OWNED BY public.features.feature_id;
          public          postgres    false    216            �            1259    193542    games    TABLE     �  CREATE TABLE public.games (
    game_id integer NOT NULL,
    name character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    description text NOT NULL,
    "releaseDate" timestamp without time zone DEFAULT '2024-10-01 16:54:21.763'::timestamp without time zone NOT NULL,
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
       public         heap    postgres    false    5            �            1259    193592    games_developers    TABLE     {   CREATE TABLE public.games_developers (
    "gamesGameId" integer NOT NULL,
    "developersDeveloperId" integer NOT NULL
);
 $   DROP TABLE public.games_developers;
       public         heap    postgres    false    5            �            1259    193606    games_features    TABLE     u   CREATE TABLE public.games_features (
    "gamesGameId" integer NOT NULL,
    "featuresFeatureId" integer NOT NULL
);
 "   DROP TABLE public.games_features;
       public         heap    postgres    false    5            �            1259    193541    games_game_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.games_game_id_seq;
       public          postgres    false    5    228            {           0    0    games_game_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;
          public          postgres    false    227            �            1259    193613    games_languages    TABLE     x   CREATE TABLE public.games_languages (
    "gamesGameId" integer NOT NULL,
    "languagesLanguageId" integer NOT NULL
);
 #   DROP TABLE public.games_languages;
       public         heap    postgres    false    5            �            1259    193483    games_pricing    TABLE     �  CREATE TABLE public.games_pricing (
    pricing_id integer NOT NULL,
    free boolean DEFAULT false NOT NULL,
    discount boolean DEFAULT false NOT NULL,
    "discountStartDate" timestamp without time zone,
    "discountEndDate" timestamp without time zone,
    "offerType" character varying,
    "basePrice" numeric(10,2),
    "discountPrice" numeric(10,2),
    price numeric(10,2) DEFAULT 0.00 NOT NULL,
    "discountPercentage" double precision
);
 !   DROP TABLE public.games_pricing;
       public         heap    postgres    false    5            �            1259    193482    games_pricing_pricing_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_pricing_pricing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.games_pricing_pricing_id_seq;
       public          postgres    false    219    5            |           0    0    games_pricing_pricing_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.games_pricing_pricing_id_seq OWNED BY public.games_pricing.pricing_id;
          public          postgres    false    218            �            1259    193585    games_publishers    TABLE     {   CREATE TABLE public.games_publishers (
    "gamesGameId" integer NOT NULL,
    "publishersPublisherId" integer NOT NULL
);
 $   DROP TABLE public.games_publishers;
       public         heap    postgres    false    5            �            1259    193599 
   games_tags    TABLE     i   CREATE TABLE public.games_tags (
    "gamesGameId" integer NOT NULL,
    "tagsTagId" integer NOT NULL
);
    DROP TABLE public.games_tags;
       public         heap    postgres    false    5            �            1259    193533 	   languages    TABLE     i   CREATE TABLE public.languages (
    language_id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.languages;
       public         heap    postgres    false    5            �            1259    193532    languages_language_id_seq    SEQUENCE     �   CREATE SEQUENCE public.languages_language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.languages_language_id_seq;
       public          postgres    false    226    5            }           0    0    languages_language_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.languages_language_id_seq OWNED BY public.languages.language_id;
          public          postgres    false    225            �            1259    193561 
   publishers    TABLE     �   CREATE TABLE public.publishers (
    name character varying NOT NULL,
    website character varying NOT NULL,
    publisher_id integer NOT NULL
);
    DROP TABLE public.publishers;
       public         heap    postgres    false    5            �            1259    193560    publishers_publisher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.publishers_publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.publishers_publisher_id_seq;
       public          postgres    false    230    5            ~           0    0    publishers_publisher_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.publishers_publisher_id_seq OWNED BY public.publishers.publisher_id;
          public          postgres    false    229            �            1259    194134    query-result-cache    TABLE     �   CREATE TABLE public."query-result-cache" (
    id integer NOT NULL,
    identifier character varying,
    "time" bigint NOT NULL,
    duration integer NOT NULL,
    query text NOT NULL,
    result text NOT NULL
);
 (   DROP TABLE public."query-result-cache";
       public         heap    postgres    false    5            �            1259    194133    query-result-cache_id_seq    SEQUENCE     �   CREATE SEQUENCE public."query-result-cache_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."query-result-cache_id_seq";
       public          postgres    false    240    5                       0    0    query-result-cache_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."query-result-cache_id_seq" OWNED BY public."query-result-cache".id;
          public          postgres    false    239            �            1259    193494    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    positive boolean NOT NULL,
    date timestamp without time zone DEFAULT '2024-10-01 16:54:21.763'::timestamp without time zone NOT NULL,
    content character varying NOT NULL,
    user_id uuid,
    game_id integer
);
    DROP TABLE public.reviews;
       public         heap    postgres    false    5            �            1259    193493    reviews_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    221    5            �           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    220            �            1259    193524    tags    TABLE     _   CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false    5            �            1259    193523    tags_tag_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.tags_tag_id_seq;
       public          postgres    false    5    224            �           0    0    tags_tag_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;
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
    "createdAt" timestamp without time zone DEFAULT '2024-10-01 16:54:21.763'::timestamp without time zone NOT NULL,
    wishlist jsonb DEFAULT '[]'::jsonb NOT NULL,
    cart jsonb DEFAULT '[]'::jsonb NOT NULL,
    library jsonb DEFAULT '[]'::jsonb NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    5    5    5            �            1259    193578 
   users_tags    TABLE     f   CREATE TABLE public.users_tags (
    "usersUserId" uuid NOT NULL,
    "tagsTagId" integer NOT NULL
);
    DROP TABLE public.users_tags;
       public         heap    postgres    false    5            �           2604    193573    developers developer_id    DEFAULT     �   ALTER TABLE ONLY public.developers ALTER COLUMN developer_id SET DEFAULT nextval('public.developers_developer_id_seq'::regclass);
 F   ALTER TABLE public.developers ALTER COLUMN developer_id DROP DEFAULT;
       public          postgres    false    232    231    232            i           2604    193477    features feature_id    DEFAULT     z   ALTER TABLE ONLY public.features ALTER COLUMN feature_id SET DEFAULT nextval('public.features_feature_id_seq'::regclass);
 B   ALTER TABLE public.features ALTER COLUMN feature_id DROP DEFAULT;
       public          postgres    false    217    216    217            {           2604    193545    games game_id    DEFAULT     n   ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);
 <   ALTER TABLE public.games ALTER COLUMN game_id DROP DEFAULT;
       public          postgres    false    228    227    228            j           2604    193486    games_pricing pricing_id    DEFAULT     �   ALTER TABLE ONLY public.games_pricing ALTER COLUMN pricing_id SET DEFAULT nextval('public.games_pricing_pricing_id_seq'::regclass);
 G   ALTER TABLE public.games_pricing ALTER COLUMN pricing_id DROP DEFAULT;
       public          postgres    false    218    219    219            z           2604    193536    languages language_id    DEFAULT     ~   ALTER TABLE ONLY public.languages ALTER COLUMN language_id SET DEFAULT nextval('public.languages_language_id_seq'::regclass);
 D   ALTER TABLE public.languages ALTER COLUMN language_id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    193564    publishers publisher_id    DEFAULT     �   ALTER TABLE ONLY public.publishers ALTER COLUMN publisher_id SET DEFAULT nextval('public.publishers_publisher_id_seq'::regclass);
 F   ALTER TABLE public.publishers ALTER COLUMN publisher_id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    194137    query-result-cache id    DEFAULT     �   ALTER TABLE ONLY public."query-result-cache" ALTER COLUMN id SET DEFAULT nextval('public."query-result-cache_id_seq"'::regclass);
 F   ALTER TABLE public."query-result-cache" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            n           2604    193497    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    221    220    221            y           2604    193527    tags tag_id    DEFAULT     j   ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);
 :   ALTER TABLE public.tags ALTER COLUMN tag_id DROP DEFAULT;
       public          postgres    false    224    223    224            i          0    193570 
   developers 
   TABLE DATA           A   COPY public.developers (name, website, developer_id) FROM stdin;
    public          postgres    false    232   [�       Z          0    193474    features 
   TABLE DATA           :   COPY public.features (feature_id, name, icon) FROM stdin;
    public          postgres    false    217   ��       e          0    193542    games 
   TABLE DATA           I  COPY public.games (game_id, name, category, description, "releaseDate", featured, "thumbnailEntries", "imageEntries", "videoEntries", "languageSupport", "platformEntries", link, about, mature, "matureDescription", "systemRequirements", legal, "totalSales", "averageRating", "reviewsCount", pricing_id, "storageName") FROM stdin;
    public          postgres    false    228   z      l          0    193592    games_developers 
   TABLE DATA           R   COPY public.games_developers ("gamesGameId", "developersDeveloperId") FROM stdin;
    public          postgres    false    235   ��      n          0    193606    games_features 
   TABLE DATA           L   COPY public.games_features ("gamesGameId", "featuresFeatureId") FROM stdin;
    public          postgres    false    237   0�      o          0    193613    games_languages 
   TABLE DATA           O   COPY public.games_languages ("gamesGameId", "languagesLanguageId") FROM stdin;
    public          postgres    false    238   ��      \          0    193483    games_pricing 
   TABLE DATA           �   COPY public.games_pricing (pricing_id, free, discount, "discountStartDate", "discountEndDate", "offerType", "basePrice", "discountPrice", price, "discountPercentage") FROM stdin;
    public          postgres    false    219   ��      k          0    193585    games_publishers 
   TABLE DATA           R   COPY public.games_publishers ("gamesGameId", "publishersPublisherId") FROM stdin;
    public          postgres    false    234   ��      m          0    193599 
   games_tags 
   TABLE DATA           @   COPY public.games_tags ("gamesGameId", "tagsTagId") FROM stdin;
    public          postgres    false    236   �      c          0    193533 	   languages 
   TABLE DATA           6   COPY public.languages (language_id, name) FROM stdin;
    public          postgres    false    226   ��      g          0    193561 
   publishers 
   TABLE DATA           A   COPY public.publishers (name, website, publisher_id) FROM stdin;
    public          postgres    false    230   ��      q          0    194134    query-result-cache 
   TABLE DATA           _   COPY public."query-result-cache" (id, identifier, "time", duration, query, result) FROM stdin;
    public          postgres    false    240   ��      ^          0    193494    reviews 
   TABLE DATA           W   COPY public.reviews (review_id, positive, date, content, user_id, game_id) FROM stdin;
    public          postgres    false    221   �      a          0    193524    tags 
   TABLE DATA           ,   COPY public.tags (tag_id, name) FROM stdin;
    public          postgres    false    224   �      _          0    193503    users 
   TABLE DATA             COPY public.users (user_id, email, username, password, country, "phoneNumber", "profilePicture", "verificationToken", "isVerified", "phoneVerificationCode", "isPhoneVerified", "passwordResetToken", "isAdmin", "isActive", "isLoggedIn", "createdAt", wishlist, cart, library) FROM stdin;
    public          postgres    false    222   2�      j          0    193578 
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
       public          postgres    false    4754    236    224            �           2606    193685 .   games_languages FK_0ce44bcc42a9812ac7f5c3cb272    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "FK_0ce44bcc42a9812ac7f5c3cb272" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "FK_0ce44bcc42a9812ac7f5c3cb272";
       public          postgres    false    238    4758    228            �           2606    193640 )   users_tags FK_54d7c2f9e0970e204bca905d84d    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "FK_54d7c2f9e0970e204bca905d84d" FOREIGN KEY ("tagsTagId") REFERENCES public.tags(tag_id);
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "FK_54d7c2f9e0970e204bca905d84d";
       public          postgres    false    233    224    4754            �           2606    193690 .   games_languages FK_581f665b8e1a665600c06581e21    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "FK_581f665b8e1a665600c06581e21" FOREIGN KEY ("languagesLanguageId") REFERENCES public.languages(language_id);
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "FK_581f665b8e1a665600c06581e21";
       public          postgres    false    238    4756    226            �           2606    193650 /   games_publishers FK_5c7c4ff7ecb8ed0ad5f3b655582    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "FK_5c7c4ff7ecb8ed0ad5f3b655582" FOREIGN KEY ("publishersPublisherId") REFERENCES public.publishers(publisher_id);
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "FK_5c7c4ff7ecb8ed0ad5f3b655582";
       public          postgres    false    4766    234    230            �           2606    193655 /   games_developers FK_6f64008706763b172c4b2d7f39f    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "FK_6f64008706763b172c4b2d7f39f" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "FK_6f64008706763b172c4b2d7f39f";
       public          postgres    false    235    228    4758            �           2606    193620 &   reviews FK_728447781a30bc3fcfe5c2f1cdf    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf";
       public          postgres    false    221    4748    222            �           2606    193675 -   games_features FK_72ae624da5548e602a1d84047f8    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "FK_72ae624da5548e602a1d84047f8" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "FK_72ae624da5548e602a1d84047f8";
       public          postgres    false    4758    237    228            �           2606    193680 -   games_features FK_95584abd9a452f258dd69901e2a    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "FK_95584abd9a452f258dd69901e2a" FOREIGN KEY ("featuresFeatureId") REFERENCES public.features(feature_id);
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "FK_95584abd9a452f258dd69901e2a";
       public          postgres    false    217    4742    237            �           2606    193625 &   reviews FK_98c034c1b44b843c9c4641b1dbe    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_98c034c1b44b843c9c4641b1dbe" FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "FK_98c034c1b44b843c9c4641b1dbe";
       public          postgres    false    4758    221    228            �           2606    193660 /   games_developers FK_c0c7b8ce8e0e786ca57c57f982e    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "FK_c0c7b8ce8e0e786ca57c57f982e" FOREIGN KEY ("developersDeveloperId") REFERENCES public.developers(developer_id);
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "FK_c0c7b8ce8e0e786ca57c57f982e";
       public          postgres    false    4768    235    232            �           2606    193665 )   games_tags FK_c2513018e2c3dbfe7eaee4cc889    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "FK_c2513018e2c3dbfe7eaee4cc889" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "FK_c2513018e2c3dbfe7eaee4cc889";
       public          postgres    false    236    4758    228            �           2606    193645 /   games_publishers FK_c79bfdc4074332c6b8b7b95cb17    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "FK_c79bfdc4074332c6b8b7b95cb17" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "FK_c79bfdc4074332c6b8b7b95cb17";
       public          postgres    false    234    228    4758            �           2606    193635 )   users_tags FK_e4142465994684d8d568daeec2d    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "FK_e4142465994684d8d568daeec2d" FOREIGN KEY ("usersUserId") REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "FK_e4142465994684d8d568daeec2d";
       public          postgres    false    233    222    4748            �           2606    193630 $   games FK_fa5e581bc2c90e64529e286ca23    FK CONSTRAINT     �   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "FK_fa5e581bc2c90e64529e286ca23" FOREIGN KEY (pricing_id) REFERENCES public.games_pricing(pricing_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "FK_fa5e581bc2c90e64529e286ca23";
       public          postgres    false    219    4744    228            i   7  x�}��r�0��٧��ozG�0	�B��tz#�"�����Q��/֕%�m2�d�w�ݳ2O���u1�����ֻ�S��Ud���L[�6]o,4S�p�2�/��x�nK�;|Fro!.�����ˬb��HJrY�ׁ���L�=��Uy�7�X�%ӕ\�#Q�ּ�QΜ��ܵ=X�����
�u�����>�$Ds�O�^��9��� ��7�Ĕ��zE��dCxT�`R����oF�
�t�LE�7�:n��N*��[HB��=.�����KV�؆p�.f^(��Y�� (�!�� �D�����2I.l�
���с{"b½9I�<��뜣��	����(���Y���vp��iN?mk�sf�~��>|%ɡ��T*!1�� ��o#�RF"�\Cx����q1����wx���cR�r��DN-Z,���+�\߿��]�ǩ�hÒ�,>���UPz3A cˬY,����6όvY�ut T'�@���ⴚ1�b�4g��ym�(9���Pn�'T��J�F-��և��L-�����Q�f ���|~^�轙H�!���/4��      Z      x���]�.;��	ӿb���v�%�tX�mc�fS�Xe���>+�&#ɴ�?��6�6P�����M��x�}����q���~���?���������������|��ʵ��կ����RM)Ǐ_���_��|���}�x��Z�������<OI�<��'_W
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
� 5�n�(��|�k�n!Y81�&�F�go3���U�B����U	��vLh��]_�<�,����A���Hy"�u+�Eb+3��}H1�Rμ��ʳ�Ŀf�bL ��H$X?��Kt߲���U�8�Y�4D��;��Т�.U��0�Y�n"��$r�A`�T���B�q�ֲߢ[4��lcߺ��B�����,=#4fG���4T[���0�a-����[2��ycI\��a�\jo�i%5�����F�ٺ�n�cU<��D��T��ccE͖��f���p�������O>Z�n������|O�����3�q��խ#��Jm�σ��_�m<���:�/�loGwm�+*�͒�n�W���;1��<=#sO�?&�?��/��;m�s      e      x��Y�帑&����z�Iscᾔ���̨��ʭ#�TU}5�� 	H \�d���澌�ܗy���)�% y"��`.'������琀p8��swX��|������w�^\>�z����o}� 45�`0�@�#�q�Y#�����g�@R���Qb`� �(�'�#� A#�2ԃ�k���i����ם�0���T@.A-۔O!� a�s��N��ʷ��c �9�I����@jt�n�����Ҕ�o)C9" �?Wt�?pl C�$� ����$�4� ;{d�Vpj٧�e��צ)�y$��W5$��:��k�B��}~>�Y�h��L��'�<C��0�����S�$ɢ��M�����>��_�8�C���&�9��\���=�9�o��N����� �_@�H�U����qC-�r��]{$$m�~װ&�R�4u�;�"��j<LܐPD�����s4��XC.p�Y������(��^K
�&N��hp��VD��9�")o�����R2J��=M�8���.j���^�R�������Q��Q45VT EH�x�HrCH�ja�/%&5{6;�Ӊx�Ԟ1f���v����f�H�0i�s�)y�*�@�yu]������B�B����w�J�"��0�H��9���=�D85^�6�6휹C[w��rIuǌX��$��J��*c@�3��Ҫ悸`<�hk�:����Ƌ�\ʆ��)�h��N��r!E�L��+i�f�8���P�x��盭�7�eW`�� N�z��.	�9��grJg��+qx���W��K6zR�&^�f�g|&�ϝ���GY��Um����e�:^eZ��ٶa�f��(��ˎ�?�_LEg6���fV�a��ī��=*�)�i�f�̰`N��NQ(* �8�M�{*`2\5JHI3�n,�so��0q�P�1wf3a�����c�Txw����B4S?��]����ߣ��`���[I�hJGB��"�憎ܦ¿u��v�<^���x,��{T�0A7��r}�b_L#�
��f 2x���.T$y27q���(�+���
x�S�w��k�A$]�}�ʼ��;�x�JoSޅ�~�2/�Y�U}���0w���(a�Q�
�a����N6�"��3D�`*���w��*��N�|dc.�1�s��#��*���LnU�	BM��Y�J1�8����k�w����b��p�����
)C,k��X��M��R��o����oS-[�C���]���4n\�n�C�Rhy��[��[�H
��O���4�=;��L3m����p�A�}�u�R�Xb�|�vk�fM����V3�M�AY���k�)p�+:L�݂y��;Iպ�Y���AH�a�Z1��־X����`�0&Nj�u�xȠ���لڠ�7�p��\��E-th�c�$N�sk_Ԧ6���0�9��8�$��D�4�& �ew����
6�~� b�̈Tϭ}a;�(��y`�q�h6�BW�|��;I۪��r��є"4t�5v��}q�Ym��Lq�Ge���g������0���;�ۉtRj�1���~��sk_�VhN(hk���Уz�Lu�hI�j /�:�$qc���� ����E)��[�"ם�$��g���)�G��W �%�����-�=R�f�F�T�e͙<����i~n��\7�Q7�h����d�^����6��m�ls���qU�ĭf�Y&��H�h��:`\_��)��h�Rb����i�Tq�H�J�*7&M~�Ǟ���jR���u��<!l3_�������.��RZg�]B����N�7�	B�u<X���.��Φ)l'|1wI�u٢s{.��D�U�uCR���6�i]n�a����2�u.���3�q�l�V�M���s�iF�����֍��?�]����P�3� ���%�1�"3�0��RDW�_!"��@o��],���˯2���v�]0�����s�i�A�����8G�<X{oQ�`�!�O
���~G|@J�a�$�����=��~�y�����n����#�c�˻�\�w���w@��s�Cn�w�Hyr~�}�}� "�R�?��${����G�r���\�G��Q����ū�'Ƌׯߝo������]�ӯ��O��_�l��yG�z����� �B�񟓘7����CRn>�+7i+C"��SI�06�rR�a�G)�CN���M�A?����I81�%��`�!�,6@��M벑F.��B���nV~G�4��j4K
�Uc=@��=�~����$%�=�TN�y�P�,�nLU�Ŀ��y#���������V]�,F-9K=/���{D�
h����je���\���C����}�\���Dre���7j>T��C��O=��ԉ���h_j%�x�t��s�[E��\r����o_��ڵ��#��#�t�!������H? "���~J�NK$ٞ��/y���ƹq���͏��c�G���W�{�������$����hD�i����\�ʮ��	���ej�rh�Ǯ.^��j����L�x�8^��/j�	L�"k���lu⺦j�z��(���l}�F
1�;kHR��?����i~��$�TÓ����2�9�&�G�M�=� �?~����ã?��� 0㻫�o޽~u"�J�Ԧ2�W��ZS��H�j 9L�L�#K�LJ�րU\q+��%j��/�î������3�ڨ�X*��[):1���5�v|�H�Rn��x�a��`��-��?+!I�X1lۨ�LR˻<��U~���Tn7�vՍ�^SWo��!��N�j}�I���r���'��#j�r����1N�Vi|b$d�D`-d�XogՓd�XQ�"%|Ucb�&��4%�Z}��*?��;�r5�k!��D;fHI)��
�w��4^QCKCy+)���N̦ uOM��a:�@�EX��;L�jn �V��	�z8Q�ImWЃ���Y��꺌�f=�=���~��f�����ѭ-2����,�'�YGi�*XfV򐜭��M�sr�l�}��hO�dYԤy3e�7Q8�s�2߉�,��mgG|�d�w�&�d�"��"M��(@�*KӴ=�;A���^G� 4�,*29��e��ܺf��G��E�nw$��%!�Y�
�,r���Ğ�ŐT��'7�X|,pY�C36n�E ���Y)��� �/�Y(]����isԴ��`���"e�%�Ƕ�6�ς�M*|�r����Qsrs&>�� (��e��fi��� : (������ԉ[��zF�l�N�J����,��}�IJé;�)�`��?V���U]���8v��q���A+�v��RX��C� ���@X���ܜ[fW�1o�r�[�G*�ySc���,e1�� �,[X��,��YQn��j�o����Ҕ9�+�nXvd��:'�pY��Ӥ�Q�0�$C
|�a�V�rc�~)�]6S��j��`�HZz�e�7��&Ycƴ�k�{أ�6�	�����8I�@�	�(����1?t�S_$0�a��{��4�����~�:r�d��f�p���r
��Ϻ��>��ѱ-l�~Tк��#xd(%�Y�{����+|�N�Y�Kð��q$ ��#��_JZF�܅<u[g�G��r�ʳ�GK�9�|sp��V%�Qy�1[��t�FT~,��MQ��G�c��4�K��]�픮�4�L� ���l�BxQ:�	4Y4��N��<�=f�qݨ��0�C�I!"̩��1�T�#3��C�5e��Qa�{�έ����c�q��0�Q�	��uԞi�1JG�UK�ڬ��6�G�"�i�O�4�s���k��i�=�v߳�����{0���/�qj�O�(�o���sWBe ���[���yyycGb@�&�J�o�*[}����H�o�T���g����
Vv�%+��3�r�.���PR�H��W�h���(�LQ�jCֱ4э��ʢ��+W6EJ��]r��X�d����.谘�IH�\*�i��J��OdG��v�΍*_�$����y�����X�4������+(J��K*�xy���M!�H[����    $}o����|�ڏWؿ}���'�ݷ���?���x����_��_�g�Mv�`�d�KaM�{s�ɝ��w�3` =L��'�����U��^�-O����]�x��}e������뫟�F��D��^(i|�'��
�)V1�+7��bTrP��8���"�^Ǌ)�<z�-�u#���?�T�7/��_��X���'�&D��P���k*_a���rތ��x���w���_^�m�7�';�n;�R�`��,��b,��zg,��2���C�}��\m�N3ɬR���^����^-��l6(1��o�Xs��k!�i�;�I׃���ą���ܥ�^�\�x���o�����!���{���=VP|���7�|�k'_쁾q����C?��C{Z����y�혦����:޾��)b0Ə��3sU���!�6�Br�Zkq��X�����3+?y�u��OVu쇁��=��{�C���Ȫ��'�$�fH?�� ����z4�q��vMC�PO�/@���^Q�O�����-VȕS#9�c���`c���\.���@��4�3�uM9�m�������,���ſ���}��T��NT�F<]7��a�J�ƋO���Awz�l]�>����q������+�w���1�҄����fz5�A,O�T�$哈��_�����ߪ���� M�"I?3.�q%9D��+�
�
�L���">�;��~����⻋���/.�^�y��ջG�]V���J��5X*d����o 3.2,���Я��k�3u��wN��F1�F����ŏ��ч�:L�$�������Z3�ʆ�h\*6��ԕ���q�$��UG;3^��NR���[ K��{��Z�N��T+(��10��4�n:��#۴�S3<�����HJ��E��yѻ�M�q++w�UD6H����Fd��{�Q[Dy:7]�Ƥ겙登�? ?p���,ᐺu!rqS��?0r�9J�o"D�|w ��jh�I ��%0faQ����#�n_�AT��D�����M������N#��;��R]W�D�$wb�3f���Cs\&f[rR�9@S�}�:�Q���gی���Q�������$��4m���0q�LYeu:pXT����ɇ�*�K�3���w�mw8#�pK�J�ȩ9��x���.�$��ui�ą������ʶ�gS
�(�cn����?$�9�c����\%E�fz�?�$�\bXtY8i��C)6>>���O�@���jJ�A�K��$8  �h���S��d��%)�o$�GC��i�hW407qCs� yj��啍m�#ǱP�4��V�ԑ��'�� u��|�H�a�T��9౓���=钺ʂ�G�g!�;c�M�fm"��M {q�A4��M���B��Ŵ@}���`�<O�����֜�{�A�<n|��T�6)�:Ά��A�&qb�E]����8Ǟ5��A*Uѣz�$��CѴv[�Sev��Sw&��y�J��7v��7��ۇ�SiJ�(�O꒕+F7^:��bINY�ô���MnԘ���0�J����8� ����jh��u�b���p4?�M���a&�������pAc�2�����k 2�ؕeGf.�y<®�+7��Ô*�LP�]Ut]O��7�dn^m�a�X9�;s�1�b�g�;���*�������6	����m��r����,�j�J�x�tp�q�ө�)N�0�(1Q[ ��B[)C���1ci����X�9Qf�K�����s�g�´
�ܤ�d�HleRKN`��ef�y&��5�>���*ס)��h��#]5�q6zg�u�<6'�z-���aV�E����a����>�s<�Ȧ�ǰDA2T�u�Dn�׏��Ԗ3N�Eʃ�0�
ay�R�)���yT��kŰ���^*�5vN
�&�̈́ӫz3�*�AZe�Is��9�����;ON�S B�N�M�Z��*��/�IV�p.,&Q�P �:�u66�}�Hv�bL2�ͤ�}g yPu�m��s��Z}�,�Tl�|ؠ�>rrp��1� �a�NCkn��}��96�U��2�55��r{��M�|���!C�i}�+V#'!��E綷���it�hBC�Z���d|#V���
#6�m��g@l��nE%�z�!����O��u	�Ltu2�\�;��.�`�$��i`XR�*�؍�a�C_���Ȯ@�2)�&X1O[Y�wF��$�Y�ytHǶ�l+�!��4��J� j��ҿǘ�$,*G�� �2�zg�cv�MD��Ca9�T��@%#2sC;�ݻ����5!쒼��S��'$KMM��.��L�Qҗs5��=��Ϥ����M��w�,��0��>Yc�4i�g�a�Ѿ�6���c2e3M��I4 :6[<` y�1�HL�崓���uj�_2��cن�Y��I�v��F��w�Ge�j��,�[-��w��ϧ��sY0�d���!(������1~�<>�ZWU>Ї���,�͵8KRr�`ڥ����� P�H7��9h.�[ӱm����������7��|������/_�;kH���o��4-S>��������ဂ�+9�>G���t����}�Gg��8^�L ��j�X�H`�v M�)vSa*��_����gH(�v��*�@a�F����B��F���@~	�F��"�`��C�p���*����۷�/_����嫿��]�����/[���*h�u�����NZ\�}f���j5�R,�w��u!�ӽ��ݚUit�w�Qp�\�L�q˪i�Py��ς�j	��R?�H��	~�t�T,���xz�?����~zq��u|@T��5���n/䎙���[+�)&|. �F�U<Oz����@�"m� d�W��D.bR,�%�F�|}�lS�8��X�ZE}մ��[�gu������˫W�/.�]�z���������:��m&���]�`r"U�D�9ŝ�	�2�N��D�-s�-ŔQQ�cȠ�5�r����h�&�׈!�R+��ቊ1���Q�r*tb�CFv��?r�7ㅂ5\H�N���d�"�p�F�u�:~�:n���0"���I��t>m��K�,1.��<ѭ}���#o�������/��4��X&j��l�}3k�<�i� U�!�ZP�)#(&�Y�T�o�>]Cj������@��ؐ3#��q�˷����n�^�z��P���D�{�V*jt*�����jF���2]��,��@���/e�^�?;`�"C\��g��\��1~�ã5�{+b�gޣ+��SR�g
�%/�~tq�X�SI"���͖Ps+�1��S��@�P�0�5HI���\9�L�D_J̫�W���V-��[��k�c0H~�<�����z��/!��Z1��_�ذr��<��DM�zF/Ң�]�rb��L����쨮i�a\�j�$�K��~P.CK��9�Wq���[B�tw��X��}�XO�ģ>��ً��
�)�
�2a��n�@�p{PdUW��~���!a$h�z�j[2��[AT1���YTNI��(�AP��"y�De�"]��B�$$�'�mW���:-��(5��T=�����D�����),:�!(s�#ATC�C���`�Is�3���r�	�����[鐈"u*���� *�bb��<uq3V��8�y��a&��JY�f�N\%�G!4�0�T�s3ۡF��%M0N�[����bjm��b�����>D�D�'U{�����S������7����]?�����M��ATA�tV��̵�C)?�����a�w	�*��V���9������A����	��t̊�YTx1�7�0��Icj'�����ppD;uՍ"�Һ�}�a����ķ�92���k�ڠ�c·����A�1#�뢬�:`t,��{�,�`�3ẗ́����Dd�iʃ��4���ve;S�䀖u����Y�Q�ff�r��3�4E5DP�V()mHQ��)��Xsbga�����X,L��4���	����a�J2mf�&��܏��Q��n�A͝a�~�4X7>�P�V��-إ�����C���J��    *3�5Y��Yxq�p�Gۙ�0QE	>֙��e53����f��*�-l���?��I�Aj�|Ù̬H�֢aV��4���+@M�0�q���U�o{G������(�	��85�? ~����9���2ٙ�Y���w�M*i'3e!s-��a�JŊ][����uO+������{�<�m�4�Ť�{��N)g������Ī(b���I� {%����U�3�魾E�( TYX��/�;��񚵬���B���N5_Hʕ���6��yOwƫ����l�E����&�ro��|s�4j	Si�*?�jT�4m�*��2��^Ov���S'2�]�s� ����$�eu�c��$'e��u{CAW��`�^��X	���v�ou��Ki�_�WuN��o:�)ƛ�ʮ�s'Ʀ�b)tym�뜦���;��.Jg/��А�x�lɦFK��
(4@!dͳ��Br̀^�I%�%�\u���jU!�����x�o5���с+�IW�SO���~�b��4�C��$W���'c��3����/.���	��*��_R�-j�3�u��Au��z�(����
e�-�&�AR �hWԒ�������ǖP=�扞r�@y��D�M�s�h�g��z���)�*_=#��%��KY�]qAS�B�J_�_�.��Ͳ�Ԭ+N��gI��jMb5�N�r�rLcU��N-��f�:^\^�lR�Zհ�i�h�Z�ˎh�տ5�|� �^��|�XM�ɮ{��w�7���%�^�=R����N�o���XXC�xݕ\@�|�Ip��vNJ�h�c�N���+w�n�T|��\T�=u[n|��J��J�����&�S�PO�£:C�C�5+��~�?��%��R/�)���D�َ��H�@J�}�S�1$�YK,gm�����I�)��Edi>������ +�	�~I�����Ta�(P�#�| [j#�u]ֿa����:s��s��=���+'�V�[9�?~z�W0�v�[�v�[�?�d�A�P���T<�ph�D�����-����T8a���v�z�ҠN������i� �">VU]ɩ<�	��M�F�P�"�U�Qۘ��U��p��C�;�e����]um��^��󕸟����THIw]��|���ϳ�$�DS�b-+k(��ӎ��1��"�F�ia\J��|�7�e4L�R
`��#5$�:��/ϤEr8��D쓃n��Ɂ`�fU8HJ?I�Z<f9��w���k�����yMSmԝ���ʳ_
H/�Q��T���⚙q����ɉ��:��L�Dh���~�Fs����eR|&?	�g���Qk�7,�@��i=3�Qj����"{Z�[iV���Pj�Gyry�l��������am<��T�l�h mTQ%�b��ѥ��.��tĆ�FR�;���Z�}�Q�x)]�hF��ʱE�V�VKIi����EV�.�乯���\�)��ZqH�F�����J��	Y��Ik{�&��;�RI�9o�X�8��E2PƯ�åԉ����&����sɜ)%��:J�i��-wf|O@'4��x�LH���"Z�q�q��6Hr�ʐ�Ru4�?�&�_4bMg��Q��Y��Z�T���x%4�UQ��#A,�j�V�/90�[�bU�c�^3��Y��g�ȴ��R���׮J���u'+��S������j�rT��No29�o�z���c�+a�-���U�\��Z_X����갘ީ�>����/������C'ˣ����K���'�jz�R�CW٪�黁.��d1mv?�8���O�\>x���SS���ai�� �g�<u�ŧ�a�6Bɲt�潝�s�:V�k�_�t��K���,�r�QSvC�z^)�
I���'H�:�Q����Q���:|��Ǣu�%��#�?]�xz�ʸz���aU�����wϟ\�x�q��ɋ��//�rx����[�ͻ�_-e��w�)/��V���Fޡt	��fK����T�>^ܶU���h�X��+�Ix��e�N:��F�*��\
���SӖ:�}��Bx�AQ�tbSH*�O���E�A:J���1d��y���^��8m�ݔC+*�9����K)m�v����(��~͉����ڢ�)�����.��4,���O�F���^����-O��������������� kbf���h��v�8�//}w��(xP�9!�J�1���'�{Ӵ@����Jʰ �$��EG��~1�eRy~Y[���1�'K��<�+̚�h�D��{���xt	v���D�a��c�Ϡ�&�0�n5Ua���mN|�:������.� ~�@+K�Ϣ��0�I�b!�ul���i��@�m�ǌ�ր"�CS�-��>�0 P�I��lh#)p����c�{�����z�p�1�� �����:v:��8O��Щ�F���=sߧAb�u�%5B��=��I�MY��Nz�*�a,6Jk��{U�9=�M��)r��{���\G��a��JG����d�-q,�Y��9�,���8my�%91�<L}N��:��I����%� ���BVe^��P�=>,���Id3}����s�`���F-�c������,%߈$,�Y��>(BD�T4��v�2py>�ą�F��c˟�w#���E�F�QH�a�����.�dJ|�1QO�tt�<y����q.Do�Qdf��O�z�<l��5�Wf��I��m�1X����$C���ꉧ��/:�҈<D��4Ac��,Q,6b�>�r�����n�P3��lz��0Eݕ��j�m�Ӽ\����F�Н�P�x$ea�M��u���
B	�J&b+�����������5vZ(��������?(�o�dnc�y�`�'�4ڨ�s� ��I��1��)a1y���y��2��K� h���i�<����da��ˑ����qU�f�ab�IeY��uӠ�lN��*��͝F]x�����˸�a�EKn��<ϖ�>�t*�Ӳ̒��{�9��d�\�Զ�	kd��o\�1P��2�R6e�ۺ8���J�p�AeZ�0�.�J�qgq����T��(:&�`r��1�f�b���Ji�%PԱ��={Î�epLi�e�\DE
x[B��5+�9�:��,�2s�];(�l��QG(�6�Y�4���V�	3��?"��i� �V���}����Z��S��fA[�u}��z�7/�ſ}`�ޙ·,l#����|��ȿ������3��XP)G�:��n���rL��ח8���О���>�
.�������5z%yN�������F����4?l����΁5!Y_n0�d�i�$1|Y�r���W�a�s<�3��/�bv}u'�$0]o�Pc�HET`�m�w�V\���0��+Q �lK��_�H�i7�BA�hy]5�a���wvQ��e��&Hu�}��zK�R����F�4b��U����E�+�:���ZP"1���J:��f��__�@/�]g�5@�r�ޫ%/��t�D����}����ˋ��=��i]�D۾�v~�1�{��I0��On|���)|��pP9�@h>[>�o�
�Jb��\�2-�z�j�(U���Fڋ_/v��ꃫ�o\�'�?����-��ߕ��V��u�$�·z���@y�4B�.vQ�J��__�����/�����ƕ]�.� �t	�;��Z�aid�
�����+	���r�x�F���?VP���k�3��n��,�\��:�p-[��X�#9B/�nv�o��2�-`�F��ո��Hŵ��ޥ?'��p:�$j�)���՝���RF�w{�h֛}���!d�t]����:z�^��r�zi⍆��¤0���у*8K�L�8�P���^�*������uu��x�E4� [UZ���U<�J���)K �׊���(��F{�r���.��P�O���xL��з� y��fa9}�>S^Th\�]�/�\!r}�e
�PkV�w(����{�� $1$T�~S�u[�tHA� ���'o��W�@We7T��ق��JNw����S�";ѳ�4�r�����CT0��-�jJ��    �u�]�#;nC{m]v�F���@*�{�<�
��y�Fwk>�ZԊ��p�����F��,51�$�d�%6vQ����Q�$n��k5Mɏ�7�&�vY��mwE�
2��9����Z��7BDˆ�6�F�����M�`�;����3��������U6|��*$w���.໑�
����$�~x�2�Z-T!��7�ֱ��uՓk��Y�>���#���
1�d�{����K��ٿ1��WeW�R�*�/�[z0��*�H�J:͖�e�k�)ڬ�/�S+��J �����;`To�Q�Q�Ų��?��>_��|a<y}ui<�NC��6����Uj���8D|��7.�y}���&��QQ��w/�^*��G�S1��}~��?hQ�{\��9u�KU���N�@%L�g8�L_`������م����/(Z���?��ߨ�E��ӿ?�x���������鈪sReے�i�.Z��ֈ��Ȟ���^!x��E'5S ���0�G�j�~��ZU�Һ�N�Q4I��%�a?>1"}/�qa�b�е|��Ji��U&��q�2yH-TZ�A@��*k@���
`�\W�NM��
��3LԂnl���Hcw#�g(#��U��i�xn� ր�{���؏��ˌ&�;)��V<OD!�+0���QOhYz����~�<7	�{o:�`�����<�(de?�][�.��ʮ�ѿo<�5��-�U�!���[����񇹯,g �7i�x�Me�<&�G�� �c,�A����O��xu%DeV·�"���
q'쏊�bd�t��,���s�,��O��L��3�}99s�N���^e����`�S5�&�|+U?�V��x����G^��c
��'��%Z���<}���I�a6�!�YUWe��x�>s����J�j}ߤ$iCg�O5��2v�0hH"��*���9?(#?ZbF�c�I8,�8�4*�mT����rI�ˢ�N�3��@�ECJ����bH]`ve�T��9���Z���x(�$�(B�$��<,D��(�8���۸���Т����6ͤPpQЩ�B�\䕓��gw�R*��q��y92�(I��b7�/�~�{��Ahp*�[m(�J)�?��[����#���lB旦�X>���b�L��I��}�w��̌���%r�]Q?�E��0�3�,&�xޭԇ�.|�� ���MYd�I[m�86��wB�lRf����Ã�6C)mE��)���x�%�7�ю.fFq�y2�(�lY��Es6���Bӫ�Ə{zq>��F��������S;�ޔ�Ti���}p��JAM<��V2��b��ࢻD�)s�ǩMA0��_�$:��:�:.�8��\7}K�ޞ�C��q+f59�K�툗�U$���h��Cvo�v@bj{��Z+s�X��',��D�|�Hv�@Q�7h��?��F�7�̳���߼����<��M�H�B��ɦ:fm'	�=l2�ȷ�6�-�mk%�-�V�W�ux���N< ��e�?��&�o;iq�B��ӽd6�s���ӎ����B�+�v�
"K���su������^�z����޿T������%M5�kg�E�o�%���,ߝ���N��d@����K3��B]E"V�Τ K�ꤤ�;J�N�S.|U�CU�0`����v�,���r#�����_%��	�]�@y�k��S�"]s�*?�`tZK}�J��*�vP�b�]#��E	��U>U����̸��k� �V�P���!²1�?���Tc�OU�XF�����d|�f�~����}Ó�l��owA�W�����B��p�����)�< �����x�oU?_@Y)�̲s3J�khc{O���u_��TY�	Y�3ڬ�iBרP�TFW�F��HQ�'#���@|��y�[gK�iD�1H�u͖ȄFU�]�����poj�.�]2����K�K��R+�7
���ǒ��?��詯U�#ѱ��n�3:�t���G^�z�\
��-��2 �F*�������h�N`���b�=�x�+g.'�*a�|ͯ�ğj�5��੽�u}��9����J�xګ�ޫm��ѓ,."	U��^�`��H�d�K���w�0��������u��/D���NC���"��Z�骸�3���,3�L�KE ��54���y 9+��&H��-q�����6�5Ά�^�ue����á_�@�&� R�h��:��-15
��
BQPڵ\8Yw��Գn����_Ct��3U2�U/Su}1��8��Vt=*�o�S��j��W�_��ם� ��"?6M����Х(��j��<�֭%�TلSU���k6����ѹ�[z��n^v�`��.�b��T~>V��@�솲�*��K���j�*���R+���;���ajM��������[�.~�J{_\#Jf>��.�͍��{���fObBUV���5��Z$���,`��B�y��(�/��mޫp�Yƹ���U8_l1�c��vw���aI��;�����K]g�<��	��ރ�ܿV���`ˏ�9-�Xi�!X�����`��lp�I�ER�?>'��P��I�Yj6��|Rlh��m��.$+�
������oO������F��`pɳ��+G��SJ�-j�zKK]]Rb���*���5h���rg���҅/��p���,�4=�OsP��nq��8�}�K�8(���2C�BO��|�� �b��7OvU�����K���*��P��d))���Eގ�֘%/���.�"�����V��
ޓ���rJ�6]�A3�A���:'R�F��������^�ã?����V���|qui\�z�����ى���ӥ>��RT�jWTB��r��(�7��j#/�����e�k��B����J�ه��R�H�{�4�ai����`\4�}���}�w�=��S%BVM�v���a/�������n����B�,����f�����d#9�/`���M��g��*4���� <]�$�V��Ρ
yNk���W�pg1�ϮA��m*(~	�_z��|M��4�,ѣ�ѭ
q8������|Z��35�[]U�4� �-X�)�1��ٖ2,^`%�{��5�9l����sFP	�p_�3rcR���.i9���}z?�;E3��mXM���'f�&p���b��#O��⹓F6�B��/p?y[�>�3�+}��� ��+���}+�@��6��c�{�Zu�zR�%�P�V�5ɧ��ٮӺ��������f7�����2�gQ!XfiiV���I�C}Lh���د�?��c�� .�4��t^���`Á}�����.H�$s*+�MaE����x�z�S�cQaUܲ�?i�Y�޴�|u������e͜����]:M�9�����v)-��nnꦛB>���SVvM[`m |G�]�,/�.**4�:���{���	L�Te��t���9������i&*��5� ��׺SY��VR�,;��n��G���y�EX')G���~����XN�r� �e�r����<�E%a��4t��� "�;������f�/��y��ɭ�������@�>��|fc�8CPL�H�³��M<�����^!L���1.���[�''�L���z����ў	�k��h�=�����G��������s��ٹ�����1J�+$���I����KQ���rC��մi*)���m����+�Mtx]��[���~�Ό�)���qY��HU>�R�LD]�z��U���.
�S��y�AV�Y�f/9}�\�t���V�Bc4����.��S�����ŭ�k�]���w�Xt� u�����WIE�"���ox�~�m���l�����e�
�02C����kҸ^�u���4���t3c���E�.���(�J�V/TP�U�7�$�^�%mzq������s|`
/�t�l;���.л�VO�,ϯ�N�^f�U��dA2��q}���2|���.�S_���όK�4�'k6��v%�{�4߿S%t��ȵ�>��]
�t��������D=�]U�q��;絲���m����3C�2)�>�캆4 �    ���'��J���?�/�e���Aު`���6{}q���R���d7��J��t8��E��Noy�ɓt������������+*��F���u�ݽSl��,=1.�
�r�o�T]��=A�װ0r4��4ߢ��9C��a\�≤�Q�;����.�X�C+e��-?,b�1�T�����@�����{·���!�S_�@�Ι�y0�n"p�m��gp
�܂(~4��֍_�Yz�Y��k����.��/O�o��/����}�c�*��Br���w��}��;����K��]���K��%��k�`����j��w�%�n��;0�V�D����^V�[$5�����G߾~���ջ�Ƌ�gO~2�����/l���+��|Pz��t����53D��sf���_/���Z?��z�Tˬo/��~2޼~�����$�ͯ�,u���^aI�?�}���X��y}��˟�g//��!R~r���WO:�ˠ?1�FU$-K���~��$չ�S�~f����z%�y|����B�����ג����o�_�x�����������_�Y��Q��E�.����x��>���'zf �g�� R:��W�:�qq��8�5P�ȣ�t�b�l�Z }��RAc]�}�����ox��nm�u�vyX�j�1S�`��JJ�7�I��rбEY�b��j���r=�uE���7/�����uu3�J���ª�e���r�Y�:e�:����O�b���o�νPڄdʘ�
/�k�a8v�
��z��4��iyH-�쾚�{�*�_�4�2y�uU�� �BUF�E�S�({[dC������CUni� 6�d%,7�MT%��ZZfn��u��"� ��}Q;w��-��A�����3~Us49����I}QZe5�`��T%wf�6�
/p�ׄnۦ�@UƔ(r���p6D�S������;�4�>h��&�W٧P���X g�c6�.��m�l~,�B�'6���g�3��3�J`�U�?;0tpg�����Q9��nF$��uA��b��Ϣ*I8�Z���<��9*��VyTE�yPU��V<��� �L҄�΄�� 7�F;i�o�C�d���;l+�]��,>@2��.ka[8�L�N�Tc���j�G"d���1���Np �$#-}ZU]RW���c9N1�Щ>�d�9���0t��~i1��z�ʘ��v�����U�sUm�����ӎ��v�M�hrg��� �g`sjYn�:R��j@�:��s}�K6�0��h���&�r���Y7Il;�W�2sh�b�&��Ķ.�g�J��*B�v��3�YVJ����)�H���A$1�8L�>HKZۃ(��0�ơ�Ǫf�� ��|&R/f�ӱ9�#�z3,�gnҦ-G�P�<NS�ɛ�3)�Z����ػ�[�<tl;��Kڹ
����ݴG�բ2kg�7ݦq�v��.p~�;�`ƭ[Ah�f�enY4��{}C4�!w��U�:�)M<!��#e��!ǝ�̼MM¤�NT=�=rf��%���ENG�nmX��V�#E1k���2��q�];�L�ލ
.M~[R�Ӊ�/;lmq�L0�˼cmf���� xn�K��휒Ɍ}�lb�3�-��+�AʈM�!!��,�AVɵڗ�]��cS���K3�b7��uí���*Ρ
�2�R�Ni7\��־D��i�ќq�jܫIɰ�:Ǌ�2r�x�Cn�S߶mR��8��er7�4M�'��� Iǩ�o�Nt'�wd3)��������}�<�����&���c�3>o�G���d{�Sܻ�9�M�w=�h���(O8�[!I�Bی�I�D�FL�}�Lv9�o�b0E��l���~n���*�`����<vr��ԗl܈d���ɭ���ÈR���s{_&[�M�	ˎx^�?丩�bc������|!�6�$�3l���չ�/��2���h�&$�^�!r�����䘎ef]74ȕi�0F�|n{j`�u$���bBLj^��|�F�X��Dt�QJ�����;���}�l�qYf��6s�k���{�47n���ʮ<Y$��T1f�G���By��SY��EN��knٝ�lh;��By2��
��8��h�˱��}�lKm��B��b��ª���W���
�d���޻�F�\[�ϥ�p	�V��A��R#��df���!YYUg����������O̼�������y;�'��f�ᤓ�d����$T2���.۶]��k�R%����'�h��y�)�(��:�đ�l{jo.��D?t��h�R�*��m�GV�'ʾWN[y���!Zd{R�κ��P��jyѩU��|����� �N�}��\K�����m�n�������P�\��.�Xl�q�x�݂t'ʾWN��nY5�$�r$�"ݏ5Z9b)�ze5�d��ftm:(��Nq��{�,nHCO2�G�޴e�+�0&�څ��^�'j巽��0jI����r��{ek���#�(j����籨��
��r�W:����aU��!����o0��.HY^��EX�N�����R�C�r��YT9��J+�ɓV?Q��r��-�6��t�5�՚)�oHj���Lς+�ZkԔ����7�3��ұ��h,7�e��WV��^j�J�E��\�l�n�;�^Yk�T�w0}��q-:�$Y��+�9�+z�HC�W�cyq�=]X��cڭ#Z��UYyo��h�j���)�z�<4�Z�v]ȕ+�;Ďw��{e[I���TڭV��omi@��`��e�{?mP;ʝ�i(v'�WΩ#h1����2��e�2�^c�R��FQ�nb(�[)J�H��D��ʭ�h����U|��D��G+Vŕ��z�W���}>�cٙD�\�h��{ebY}*Չ�9I$W�6P�{��r�S��(3���b���0p7j��D���c`JI���AP����1={�+7q�W~��(մnz���3��^eK����,�j��-��,<s���h�w�tݎ��(�@&�耺�]�w�4�#5�
zT�Qk�h�y�z�Um��Aen�U#�إ~K����.��TtFtN)F��DڊI<��J���4R�>�Mz�K�j�U��:�B:+"U�1Ӭ$!Q����l�cM�C���(������4�{?rk���SÂ.D>qS�ZcQ|���Z9a&�j8�U�.5"E�Xjj�9�	��$ N')f���{B�{�馦&c��"*D[R�����g�"vEbQ���t�{��~�E��l�p�T��2��'�(�aM+p���*�eK��V���nä��y�������\���~>f���x�~�s�%
�p���l����"��
�=oŢ覌tK����aTF<�
W9��Yk@N3�J�fh؎FL����"1P�	n	���������}^�OPǐ��ܑ0�9�DE��\���<&�6k�q�!S�	����tGkf�p�
i���lZo��Zx�ޔ@�C@�M�;�����8�W�åe]�*	1��	��*g^�ør=�\(3T
�� v����T� �]鸆Y�$Z �������� �.PX�L{%".@�x��J��"py\���]r�
���7)��dp�Z������dSq�����\<�!�}H��m:��zzyqz�����Rf��(�H �� K)�3�D1�A̅1g�@%��G�ڬ�`�����ʃ2�{Z�G�����r�H�0P��d+ޜ�0�uq�8w���8«8�i9�q�$$���˿���|�$8��_�����*�96|���a��l���ɎM���A��^���b�t3%ٰvC
W����=O�	����6�Z�+(z�������U��J�E�	�zZD	5"���@��?��E�h�0r�]�������|���<�h�$\�]��Z꣖�ivc�P-��!���|�^��\<׀�I�yuE�(�2&��#��F�����
xA5�Ѻ95W��-��7�"�q	a⹦sgd6|^J3'\F/�J=�(z@�&0+�y�t�7�9G����r2�����R�����J�Z%�$�v9`��kL�u���r�#O�u����N1�H<,&    :�"�gZ�* ޔAW1�>����Y�Q�я`Ez��AiC�G�E�8�^*�`��	��g�-m�h7t�	k�^�xQ�8�]�o��!sV�^�\�_`IIܓ���];Y��#�=Nm\����EO�7-�y ť��h���<)f Ň���iY��W���3�S��}�	LG��ۗjJ�a�N,Wc�,�ҲK+��ܥh9p��������:/��� y��Z���)15Ԕ���LC,�ί�'�X��ai����f�(�A��hZ"9:��\�ݲMf��1a&�i��9�cF�~	��#n*�P�0����~��]XX��cJ��5�%tL�XY)�6o��|��U�j�L밇hCzz���ڒ��i��Nܹ�p�	t	`��l���K!垑Z��R��OӰ��㱰����9Ä���x0>-�L6}���կ��o+�՚7� 28������K�N�\�`j[N;2����H����Y>�.?g@��慂���G=p?v=} /\o;�u���g��]��)��+g@+�/fv�2Pѯ�s�;�bt24Ƅ�XI�8n�䜝`�V+oI�	��G���=�R��`D�G;"_j.qX��l��u���ٔ�E���M@G�yp�I��坋v���5�ΑW�Βz�fˍ�vD�D�f�};FL�Л��xjxM�Z��>�U�S�V�~��!����|�s��4f��,�q*�%@�u���Dd۾-�0,{̣�Y�����N�������9�C��3W �U����>�n��#����U׿a�0S�4,������������/ɝ�*��<�.�
�R
�se��;�Y��).�'oe	�,K�HXI+��D��MϪ�y�W u��'p{���~?m���1������^P����#��s�d ��EYek�����>|���X��$��p]����[��w�޷E�؎h���7��-yVf9�U��=޼ݦ4��_��> #8��C+�?Qe���l��1ea�$�l��5����	n1�R\���}�u�$ߎ{�V2]މ?�mKV�v緰���߁N�eq���j���_I\��qђXP���oо���Bڌ��e�^�^0�{�F ��#� ٫��ْv'#�.�
$�鏜���Xx��1�d�p�t{/QM;�m}�暝�ʩҿ����)ȫ��Ft�P�u]h象�^Ep��tnM��z&Q�2`�f|��d�$:��ٝ�jU�ԖʆZ��-i�������4���v%	SS����{��λ�葮���e�<"	SF@.6�zf�v�Ū&���j���z)֮+��$�{h��$a�]mej"�V����z��V��a�Q�s��J�<�`��&{$�e�W�ׄ���	�GgU�z�&e�h��e�i�۵RSɃ�������鹆Ky��V��|����0mK���rŃ�U�7�foğ��wM�Z#�h��Y��%a*��ؤ��P�;��i,���iI�� �vD-�W+Yl��L�I�m�A�I�*Y���h����^e�����%��eJ�긅L�O&aQ<�ԕ�m������E��0u-΃ز�N�4�����>��EE��n��폚%w��f�YA�
-�C�i[7T��b7����<�q-�:*CHz�z0�l$��?X��A��*�q5zU���T���������47�B�a�XZ�
+JEݒ�.�� ����sz�Z��(e)�m�����4K/Vj}�p(\//�<�Į�J=��$�ҥFf{�D<��k[׆Q�ڠ�PJ�V�`�}�վD�k
����q�-T�@�G���A$z�W�Q�e�݂y>�ULp�9��*�����^�6-=�{�P�q�*jR[#��F�y(�ӯu��+��:�)����T��F��r�˝�F�J|U,�2��neExMֻ�iĴ\�1L?��e~ꐎ�X�0�N�Ud�e$�������'6XKuD��7�*9U����X�H�h��yѻi���Q��G|p~*�O����N��)���j��چj�מ�;bnwM�Ҩ��H��O}� �aX8�8��­����2=��m��.���hd��2�.�h-�P/,;FX������T'�՚��Ԡj���dɈL۬t{���_�Ρ~��-N��s��ضG9v�ezj��I��{��8]]E͓�Yu;=��S�c�VF$W��ئ�ڒ��O��6��ij��D���A���
�����}I�aT��Ic�~@t�_�&� �}�a�8�F�P��ZN���zc]ͽBsS�v�rH�VZ�Ezj�HH��Z���EZ�����^Y�n��N���R��qH�=����H�_؍��Z�wc�o�pKb��J��|�>l���9��xI�,��Y�d��WX�v��T��aN�?�m���x�y~«���S�i��P��K�B�V%�EL�tj	"�� )+ˬ��J��"��G��>�C?�cC*���-����T��kFW�����*!>u�� [��V,���ґ .c�L�a��xѷ.\'� hv�mRr�N���'��.����
�YV�x��M�B8٪O�����X��x�9�_Կ���B>�J�e��j�G��E�dS�6�R�NH�[:Ф2Ͷ��� R�D�w.^݋=��ۓ�>��vg�^&�%�`)cJ��CI��~o��;_}=1{�������_��P��}�s�7O��ŔEB @���nE�v\�+a4Y�=^Na*�檦% =�/}�늽�l?�����uiC� ��ې���j6�����3���ܮ G�72 �s �g��޿�S��ӛ����7����7�������ǋ����N��W��8"e����/_�b�pN�pӁ��Fx����w�2��\�h� <�έ�r��,J��й{߄����;� X;�6'fh@A�8�1��`�
]�nخeOҍ!�����Y2��N�i��"�2�Ψ1mQW���:kb�P�t}j|���C���9��u�ҕH�H^��) ��Bl��Bl�SCl���[�Q<S��DLP�bs�R2�,3Iv%�������O
��&=xבR7n];Ge����A��F�iCԍJ��l���Bl���$oiJYNL��b5�f{#�~0[--=˼\*]O2�b�N�MU�B��A;j��؊�ݤP� �}ަE��*������^6<U�E�i��oU�R�BlA�f�*�F0F��f��r�Z����J#������۬�%�}(�V�F�z��c+6���p���$�������Bm����3�8i-II>b���ςDw#��XrS6"�����L��G��{U�@�P�'Cle�թ^ԙ�V=����2��	!�:��������Č4�^�B-WH���e��g:E����awb}��j�+~�Ҿ�U�w�zG���/#��>�]Q=��Q����H�g�zf��J��(r��3a��k44�hiuSEͨGc�k��*�9z�4&ʇ�½3��F�"�d61-ɭ�! ���;���OO�LQ�ޮ�$"�¡��D�q�I�(�N=@�k%r�fi���U6U��ȽEz��h1*�@��.���ij�$�p��M�L�qeD���y8&k�G�W������S�ȫ��M�5�TCv��QcVq�ñ���]�e&~�B�\&��^�Ŭ"��/	3(F�N�P��P��I�kZ�ms�}�jWN���/�T�l�B��ȍN|��tLwOhs�ZXN��M���ym�Ɖ��f�s%�=�ÙQF$���B{���c���Yu�ӵ�k��q�=1�YO�NÑS�@�GL0�1��'���g��E֘�#Ia�X�mVM��C�1�A��2��ҭm+[!	���T$bT�(�4K�M��:��ٴE�+nv��hV�˽We�S��/�T��Syn%�<B�s��e�V�ə�+�k�M����kt��G:v�D���Ċa˹�/���l��.��.�{k��y��im�yW�� ��.��ӄ~�R�?!m�?��M��?|��b�'u�ႝS���/G�+&N�MX�������}�E������H�Ÿ��q�h�f�ِa�t%��
���+%I���F�1Ds\Up�=e_;��cW#�    ���W�:~JR�-���%��WQ��Q �(s"�ߪ�UI��6��{������w��]�&�[!ޤ4������k&n�y�6r�`Cx�m����~�.S��+8ȍ�����R�A%ԥ�b��qI�ș���_�a�.�����k�㗰K��`Ė������BN-��Ï��gp�d�Y̅���4�ӗ��N�����{��5*}n�t-��8�w2�Y�.َ� K�NA�
��bz,|7��|�Z�1g'�#��<�8�!���j��WHc��Ăi�(�f
���C\�{�q�-F�b���	A�D�����Y�l1���ˆ���3�L'6LԷ�y��y��.Ɠ��_O���[V�\,C�EIBݑ���-��c�SV�!h���h7�ܬ�,�� Q�:J!%i�d���\�. 17?:�!I��(�X�|+�������!5�i��%쿴m6�y�����5ƴ��$��_���w۴����T�D�]��@_5����^v�/qGA��Ƒa�	�߷B��ݏ$q�l/��D�sQ�_�`���7��)�D�}~}���>Kۏ(������<gI��C��,K�zB軟z��y��~�~�62�c�{rOD��޷�[��#}����t>O���,��E�I�����Ήr�	4S9�W��&���\~���|�n%�o���'˸�ՙ.d�F5�� �ɤ�X�@�m�"�n�����Q)��^po;r�Z/Nߝ�^
�Nߞ�_K|A끈�%��Gb՘:�d�Ӌ?]^����ק�￻�//���.�.���� ��<�gΘ�z���q�G)%�_��-.=����E �����{:�t;zK��������_��\gW������w���p*���NxqA�~�����|R7�FLE}�9.���k�t�]�C^���Z3S(����������w�o���qC��S��)�f�:�"~�瘃��K� ��TQ�<���'&�h�d�G�'�����U˭��ao�JxRS��u���"�C�4AX>)<�iE�^�ϗU-P5'��c9tn�E',�T2Uٔ|y5~Zx2��@j6T^7ZҶ��ɠ��@�,7�]�J!i���'=��Դ+pډ�܏=�'<YHu+b�y_��:(�c&�c7��'�:W���K�5��@x�W��omŊ�P�p���*5�����vM�;}߶e�`C���#��w��I~��R;��X�yvhxR�B	�i�Hv�"��ǟO֮�����=1�jD� �Ҙ����I?vkQol�O$˕�V�dx�����1� �Um�3��'�'��(�����z��@�Ex�6�T�T��JV��*$���"7x��A�9�Z�Rk���I��b���Zę�D%H���Z.s'�W ��''ĩ��0T��Q�q�}�4P�$��iC;F��e���Vdf�O]�;�2�V����몑�E|��(�LEy(殌P/7��'+����CK�oEC7}KU%UM�E���S1�r��ݬ¢�WS�RY�_K�xLB����v�Ќ�=(]ݪ�"˭�qmDCS�m��XiB$�>��8�x|�䗓�m����8������k�U	�$�<oL,1�j�U�azt�TD�Q�ba7X��j�J�ԥz���>��6�}4$^�?!�D�'?0=;M��SJ��5GY�J=�L<I�F�_��l���3�j-{�ѱR�V
���3�>M���Z�4=�6���hD�~dc�9�K0�gL��I��ȷ9��?+��9������a.�B�t�eTg�qc�*�j�z��yqU�����'=Uߦ-&1�����x�T���Y]�TH�:ز��� �����<8P�t�g���Ħ�9���,�XY���>��������p~y}����Քх���O���� 9�>3�D	��D�D	��6�4��	Йo�5sțc����"��������b�M�O|�B(�1p�y	��5S�[-;��yO�vAE[x��B����7�?L!��]F�;�a���D+�)�ᚑ�m�8A!D9��Y�9�$N��G5�x�����ED��4���M�}Յ�8�5�Q�}��*�}quzv�n
߿�\}x��6��h�:��ys�o6(�,�d�]��l��fhŀǗ�gǽ�m��B��d�ca�q1v����r�E�� ]��/�͜5>"1��&�hRRL�m��ħ�/����<��ݷ�5H���4�[��*��A>քW�G��6t���rl� ��2rЇ/�u]�˹�٠��E��N�_̐��:`|��}���w�O.ϭ~U~N�����.|�Kz�@�Pã���!��W��\&S��s�6m&�	A��?�����8�-w*[��8㑘��䟚?���A9��K�?�}q�;k����3��>���~��g�����E:�-����še[��W�?Ad���S���j���M�yY�M�G�_ԭ�zrhPL��U2s����7���/�z=�Ѵ�{�2����o����ɝ���QM69�.n�S xJ��3�Sc#(�����yj�y��)D|:ع73M�{�K����=A���|M�,�K�W�ˬ�eV��+ ��[~�X�!�{B8������S*�ER��h��f�׷���P�	�F<�PۯpkN�|(��+I����O�x'��2&q=)��$ܠ��|�P`���=�=�IѸW�}6��P�5�h=Ս(md}�s���^k�!�8���@n������뇚\�Y��RT�#Q�F�'�7Mʲ-�v4j-a%��ZP/�k�
*�C/��f7�(�������tMnL�Q�5Q^�ՠ^�6�-긐�~%6=a�$.�ԣ}�u*��]���V���莽4e��MMk�'
�C���h=�h$�4eX�Q݇i ��A�B���sL=n"�2Z7��Rάᰠ�����&�r�Io;��PPO���+GG-�������BFlL�)�E�E��ƒ�[�oש}"�7�8䶹)z}��~-w�_���jS�5�N��uu[Ǣ��'�zf��j���8t��wN�`�	A=Y�C�7�=�iB��q��)كKv��E�Q>���R����hJ70��4%CUB��E�)�E��N!S�����%v��ul�F��@v`�c�� �z�Q
Y��AQ�E+v�ВM����V�.$�����<����+��2����^kǦL2�]���;��&�ND5�:D��C��*7T�ѩ�YE^ԛtFH�"��v����P�Vx����F�'���1NpB�����8p����EI;2���%-�P2r��(2��xAg�����M��c��c:�"�hWJ��'��惥�U^bm��O��&�@]m9�"�Ke5�k4����u���k;�&z��p%u�P���+m���D�#��EeI�����ϩ�0m[�9p�T[�f<�FspFò5�Mʘh�(Ib�,i4=QwI^%�=�$Ff:���֊��m��'�:t��r��z�Q��u_Z�[����H���W1
����FY.��(�(Jf�H�`�V�D�:�7%7���"[$^�?!LF�VF3��F����Q��@�/�,ۺ�#M�L�A���A��Ji��Wzt8X��x,�hl��U&�`X���f;I����RWUQh�U�� ����_��]�I,���L�GM���/fe�W7��������W�������7����7W��;�ٛ�W��O��[�S��W�o/��W���^_^_�]p�4f�������k����˿�����f��#�����S����$���{��{_��F�J��[� A��P��1��� ;��$!��o?f]�[���Չd�)�' ����W�/T��K�x(�����Iq�y�Uo>���O�$C�5]��7yݳ}�ܭ��6t7iV��.bdge<ba�x�l	!4���a}[a�ݖ���G�[�������:�$ Hʥ��5�i�\ȕ���\w�rYP��[�hT'Y�s��l]v���A4�`s�Vo���N[B����IAs�F��Ax�e�u�D�I�2���,
j��,�$�>�ܜ�!��p\<p'�y|�)2ãv|�    �uu������{�F=��q�r��ͽ$U-�� ^x	M�^��^g���7��ƌ�c:���lL���Z�1��?ߘJ��������f���,���a�6\�jWb�|H8F>�o!�&A�R��Fڱ�,՝�lo�I�3(7t(�F��dD7��ʀ�q!�dHA!�F%36�t:�R���	P��Y5�|r�jڿ��\ v���i^��V0-�:���������9��w�|kB�\:�v�n�c�7��.߼���ʛ����77o.����/ޟ� �O_�������H=����@v~q}s����˿�Lx>�7YJg�6Sg�f� ���͞���y��V��5��{f��b����א�!����m�u4%�2�fw2¼��q<	w:��a;��@$�i�Mg��Jkӏh��:�i�Ż�aN�fn���6M���2�Ar{�`W �95M�-n�ǦN7(Iag�@g> &�f<�����5f�Կ�"�	H�&�G�����>H����-~��9
�V=���4��_f��{,���7� ���\��˗��{�-Sy� hfs���H��\/ӅՀłl}�7�>)��t�H	�_�g�NI=ю�`�䴈�-6j8�Y�ߔ�O�ê$���c��ک۶��:7>O�Pm!W��iVs�\]�z��#�'ÜM���'�Q��*���F���1N,k4�4s�ɔz��o���j�� l�<���Gb�l�YI��	�8nz�%��¿���O��������&�8$�>f��c'ț�ֶ�x�j��3tHv<��/@�{X�uu��|gNO���2ۙn\�Cp}CN�ӝ-A1��7�2����l���$DOާv�N@r�>��?��7/?\_z@q�x]N*��Kݯ��������8Xj:�h���
�!��a2�����@�]3vH�=D}���llH��Q�:���ǿ{���9F��J�yj|1�ms�)�y:-�����9G�v"��J�d˄3�ؚF�E��L�F" �+GWf�-05����A366�qی��x&�>Ya���fώ����C��`��iB������)�G����"��./����!_~%�_�%�5 ��˘]\�ZưY�r����@�b��8�n�a\8�3�s>!DJ����h��U��h�`O`����Vt)�j'�X�� �/Ѿ�D�'č$m$멈�A�Ӡ��<�G�-�T�{q���Ug�ط4������I����Jna&��kDv��]C�d��q^��InTUN�e��i��*���RG�7H���6�"XE���V�XJ�Y}��|pF'��"n\�I+�I�4j��AW��>!]RY���Y�r���-��+�!���έ�Se�D�!K����C���S�A��2c�H�QO���� ��E�kr[��leó�.xqc��+�F�
CBa�!]�Ė���������b{��"]����c+RQnz�pǮ����c�pč��<+|K�m���T�Sq�9C�u}�Hd����\'��' n���RU�f��X��+��q��a"7��N��8�bC�Gˎ�qS��i����w���Xճ�FR/���o9�¤/�R�'H�'C\�Q�+71�
4��F�4�J��+�*�	v����5�CӉ�t��V�8؅�s���h!QD:G�M�Z"�@K�܈��[F_*�Z���8c�-17j��Mi�f�j�X'�֌�H˕���/%c�ͲqJQ�6�R�uЍ�F爎fIc��u�tCI�$���l^UIt�ٻVd)K�Z�!���:��eRw�(�?/��Q��%0{���K���Ր|E�k�L���0��d�q(�oĲ;��V��!��:XBn
�m�����2'}�U��fM`�Pȍo6bo)z��U؝�YC���t�^G$�B�ha��m��}U~6����2���6r�EU�A��R�6��L2LU�f�G�Y����z�-]�h�c��B����]�q�T�-�B3L�j�b���5e7sp^�?�r�����V<9�;dA��ʵ~l9UG�QWG��\d��2�PG�R���/����(��rmj�C�ں���]І5��&z���֪��F)���3�aL7v�h-�I��7^��h���g��lE���h-5.tT�UՌ���Q���XCkU#�l�,�b(���礶^H�O[�|�d�������ʷQI�\����nԪ]x�f߰������t��H3��Y~o������'��v�b�G,B���J�7�����\�����8]C���o�/�П�I�s�#�c�|%=loc�o��[�A3��i��Lx�WG�)������sȑp�N-S �j'��{T��e�����������))!�)|�dl7�"S�@�>�eא��	s��n��̦u�5cK}��%e�0v�&e ���g�M�F��{��?]�E�C�����pP��^�@7�/P���G��?�ȭ�8O}x1�0Me
���|Nj�h�����Y�C8ۦC���o8�6�p�ܿ�"M����>��.��+ֽWt��Ň;�8�J9e7�7Y�9���k\��̮��q,�$"�M�m!�T�d)5�+:r/�,;���e"�N���Y�����ô������h��ԥ#��F�d�Ǯ�>Y���?\�ԛ-�l�i3�
Lg;��7rv�����5���������2�{�	d		p' ����O������sz<e���S��,� �ˢ|9T}�j�6c�sxK�<��n�l�Cf�, ̭uG��-�o��t��G�Z�3p��Άq�y�9u[9��K.V��9��Vr� x~q$��������@t]5l����qʮ�Y`owUɘ������&u�p���� �� ^L���J4`2�y����%da�L�w��� Fh#\&8�5%�kb R麟���R��?���!�w���o� 7�}{G�G��s\�`�񑐧�I��G�O&`F0�%jb���ߥ���q���v5�>�eP.�#5^1�JΑ.|��z#	/�^�7_��a`.�CI��.���c��|S���3��8B|4� ��5r�5���3:��������?��� �Hh2[Cd�ʻ\m�6x�n��Ӂ�R._^�|l������ PW0a�c�����v�h�rO����G����������V�?�:���d{,�2MY�Hؚ_�Q=�-��ߜNV��6��z���������6t�H���b8���.` z��,�1�hP}��<Y�3��M�/>�G����b>2 ,����+;��$n�qc麧���M�<@���,rW<�����  -:��ߝ~�z���Z "��(�\���~�n�h7�)K��5�S���]5�w�D�zU�@��.� ?����?��ӚF�<���g�]L�Qͽ1W��g��Xx��]O�J�!�:���?w��"c�x1�Hʡ��PH�|nX�YFuzE��p.8��.�X%�̠\�6f�b�S��	l�E���k����W-�"�Xl��qa�9�%�*���DX�[�酚��N�gwH1�| <gf���x�V�t`'^h��J�Yx0�yDm�L;��	��i��Ƽ�n'�M�dޔ�M��`f��͜D������)J&5��v���Wdj�s�μ�b`������2��4n�n�0�X�������X��	����3��dW%D��j/��&�m�>7���=~����f�=]�ƌ.G�g��8k�<��jʬDS{�1r�2ݕ��wf��60<�*�^9`�q�A�iC���c�&�+X��d��Ͷ�fCt���y�o&�J<�&G���*���_�It>TȦNn&ݣsz3��`�8��.$�v�5\o`n0����z����	��HP��xn8a�i	#�<:4�C<+5J�r��
 -EX�.f������S�56�ؾ��(]@�ec[�Hu&	謀�`�b��;���P�;�9��[�X���mp�#ۮzp0��A�l��g9x�	�O��Ӫ6�|jD�=Ί�؛h.�C-vw�g�Xa ��mI?HX�-9dn    �lH�jZ?��`��@Z:� �Іf���N�ؓPZ-�6㖿���~:�l������P#�Qr>cw]��t���� �����<ɝZmu�8�L[��^���A�,��s�j�~��Oq�	37s�x�Q�^��O��9�[R"�}'��S��������ۏmP_S$q����3YLqv�#����E��t�vB�K|I�so��ECU�/p��H����k�(�Nk�;k�_v(�����$k��?,\�nS1Z'�:�G��J���o��¨/���HM-��=t1���?���|��N���u�鈄W�~�+K�AT4��z�푍W�O3�0Cx{��`�>T��y9�̗k��<9�H�����*�y�4y�cC�nP	_�����;�h
�J�g����T���ޣ���������W�ȴ�}�.����s�jqZ�3�py�|Lh�`>����� ��O�Rx����u�ӵ�eM��wU��78M��,^8G`[7/�
����s,���(�yפȥ|�Q%퓯��>��t�0�g���ò���_x%��ΐ��P��{_xs�Y��9AIF��T�ݫ{��K�9���ha^Z��W:�ge�&ua�����q� W�z��S)^�k؟��V���@ �
3%+G��NO�C�Y\S���#Y�/��׃s��+��\/�ի�I��Lx���S�D"���@���}��j��页�p`�@�����V�_g5�/��������o3p�/��<[z�׍y�����ƥ�@R�o���%��K۽tha�Ks��n�SX������� ���P~���lH�����)�n���}	�����Z���7��]W9@*|�h�C�o`F�-���=�`� �­ɲ�\���/-�C�Q{�ꑺD�
U�,�x�*��o����g+ί�� ��у��7�����q5�����#��.�����I��	=�\K�f9U?fq�R���0Ͽc�x����x;Ӈ��n��?�6ʘ��;�G�H���e��9҆�EЅ��p�ċ��2k��d�����W�ݦ�����q�2v��-����){�$�MP�7�Oc���J�����޻[@% 絥�ݭʬLZ�}���뫲d���:����Xn�j��?4����V��^O�W�������[KaV��$�?��)�M�CIO�M"|��_{�I�ڽ&���}�`w�<���,���Vx-����ę%���y�x�n6T�8����M�Co�9��Kz(��w��ͯ� /8����D���~��O��^���Z5�wI����v���1�?��������\[�<���z���'���@!o�y������I^.)�ق��/>����+}� n�����e��ٛYy���z����3E���]�m�ۊ�;o�0�[TF��c�g��1����N�6�;�Г���;bƩ�oT��-�%�֡/��4k��t#����A��JP�Ύ��ǧNn�{�&���O]���rd?������ݳޞOP�o�n���"��o�hl��lu=�4�ESoFu���Qθu.��?gU�����-�}'N��ΚՅ��n.�F<��"����[�9k�c�wp��u�N��g���8�'g�6�r����P����=n7 ����[�D��
/�?�rw/���s���7%I`w~���R�"�	�A���1��r��{旒���7�
���oP����������e�V��%u"?N�vؿ'y�����<���>m3�6�Ў�k"\k�yA�=�\�н����w���U\; K<��Q�;��K��z��^�������7�Yĺ)��K��u\�~?s���Yy����Wn�0w�;��v^1�ꎸu�\�٫�l�d�Z/K��`7���<S���jE��w�v����W�<�QP�h͗�WpI��t:L<���r�)lpy�(s*�%=|uL'���_Xn�'J2�����r29���8c8l�����g��s ���,�V	_�3�~�����9�˂�)�WoK��h��Bf�$�����Q.���p֢��t�R�g.Z�mw���өÐ!��	 ��:��c��2�I->�� 0�y(H���9�^�Zx��@�ʀ��S� ~���6Y>[�^d~��;��.��Ds_e�+|����%yV�I�s��~�����G�ǒ�7t�=��Mi�<ۜ��@�4��m����dp+p�p˲E)�=&.7�}�	ߝ^�*���5��8�c��}��
����!W�>�*^)/��&�H�!�EM>wG�V	�֊�Y�O&F�R!�k�Z�ͨ��W���a������g���F�a�ګ�~}r��ot�S���g��;�:�0��K�^�H�u6B�����a��Pi���H�����ŝ'��Kg�ҹ-�q�����G>��j	>�hw���rT��Rӊ��c9I"��UjW����[*�ݽ�fˣ�{�y$&,��P%��S=n�����Ĩř���16��K�ć��7JG�����T[b��P��3�R8|���W���ꖒ,2��/�����a�C3
�D6;J�P�jp�aK�,����߅��y3�qdI*<��v��!��C��(�AoΉ񃬪7A�28���V�	�D��Nj�"��b���^+'�ge:��?�4Qʘ čhm�9MT��a����
�D���{��V� �ӇF[R�����-Y�����XC�Mٌ��
[ט Z=��(fj�8n�ʱ�G5]�ڧ1Af�W�W`��:ѫ��,�U&����B)�^7LU2q64�]t��T&5JG_�U�����ڀ����Q*z�Vy�D�姸U��VH�C� �+Z:JR��uCM�+��&�,�bz���Q
DԶ&.<��� &M�jduT'�&y~&F����
1z4�}U�q�ĸPK�1p�e�UE�E����e=1����`���@t?��}��mL�Z���)g��l-�m%ɉR���v�'� P�Y}b�~�re�j,�qJ�&��UR�MdW�UK���QUш���k���P��;��I���&!Wr ��(�"��~���� _p����L4mt\���[k��I���E.$q���J:'��L����Q*�2�#Orwt���%����&50�Nű���[g)w�v&�3gm�ׅ�jV��A�_�D,tbh��6��jC��C�`^��Q���]�S��z��r'�X~$Ֆ�W���J�aA���e�in�,�u˶�8�DEA�/w�;i�r��Q��C3�.�r'clՑ*E�ư�+'���SV8UV��"N�7�i�&�[�6s��e�xHݙ�U~W����R$��`����cSĵ���Bj{'�[#�k)�8OӶ�E�V� 7��'}`7�7��4�&�s�G�W���x��d�硛�kS?����=I/�� ��L�G�y�bݘ��UH�D�BS��Ɋ�Ǩdq��[Z�{"%�6�����wV<G�g>*�.�p��3DW��,o�OV�[�9SMx���+����Z���U�w���Jq%�ѳ���I�ِ��[ށ0w<H�nqﲲ��s�� Q���KU�e�?��~�AZ�3��a*8w�{6����E�f����i]ϧV�RvSF�Y�o#j ��ǡ����=�+d��9n���뵉�hq�v�z�Ʈ����ܘA���ꍤ�8E|��ߑ8�chR�����ǃ������\����3oԄo��1�;;�w'��D��-�>��6�'z ^}+�ZH�����d
��+�t�]_�'ŉ�e�^^�*�eF�\�������;��+F� �C[�݂k%���X�	�����R��2�D��f9Vd��{��a��!�8g�6��ٜ�5��w,�����E�W�K�D��C`�(���p	c��mʟĈ�
3�I� ���A�,�z"_�	�s+(����)���"�@�e�	���U�u� �p���i�o_�0�,�oB��z���ɔ�͛�ݹO	gtƖ���7S��|ڛ}�S�%|��y\��R��Țب����`* �ö;Y����'5b��]�BO3!m:K������]B����3    ����ԉ4��Ê��W�!7�zW�,N�!!���J�w������P@0�tѮ��o��fN<����;4<�-����]�q�3f�lfI�3��^�_�
�TXRv�g�d���@$�>�,$����|�j[�t�q �<�p��3 =�@~����E�-���A��B\,=�Z��F��h�Z7t
gW��S�qa��#��SY, K+
�4`�Hj��Iųgb��|��)���[n�����x���4�*:�b�!���"��c�BuIF�Q�LY�56�gg7�Tb�!H��%|�kΘV
�iP�}3�i[Ɔ& O����(\)�]!����������Z�wy%�I�boQcΧσ����ů�^�u���z�2Ff�������48�ںj�ۍ�\b�駱b�Ӧ�S?ԓ�î0»1�K�����m���~����[���5��4��FlQ�Sr%�m�:I�fZݏ���ͤ{�@�Q5��I�|�<�<�!|�;!kk�:6��$�����_�8{;�[@-�.��|��G\�s?6��,�|�z�"�S�A9F|��q� ?��@p0��$ ط��x�����	D���Bبa�v����0[n��ze��@�%��W���k{�7t��Z8����SgO;��C��Q�b�x���L�ux��V[Jv�e����r�[f5�3�8Au
Gz�C^�I�&�3�Az�1ۤ�E��7iW�	��x�_eN�����O-���Μ�>X��џ������\�l�Qō�lde�VR?
�K��;�]��2#�Z	�+��V�:ْ�F�<�!��I���~2��VJ�̗-�k\q�"�e�KU�Ag��^8�Qq��QI�TB��&���Do�1*�\#�[˫3#�lY�p�gɓ�J<9�m���I��1lOӂ{0*~h��\dqY:mY�U�6���J�vR�ժ�q,�Y�W�� F��Ro,�.E�ݍz3 �#aT�\p��U�	F����Fe�������]�Ҁ\��X=�RZ;���#QTǈYՉ���8���v�FAn[Y+��fjY3>FŐ�ڎ�PS�LA��eI+~��)\E-U�	Q�[���Q�O���C �����nrm芢N�F���y����v�jj:�z?yv���u���Z��b���H^`T"Yҽ̉b�J�����=�b�1*a�H�37�)�� w2-0*n��YQ�	i�1ջ\j������C�A�4²� '�j�7����jR�]�\h�`HI�[RjF��{?T�U����!��\*���N/P*M���M,}(�.���L�K���9���M���F�kJ�_E�,P*��փ�Ɔn�jb6]��84���Ri�.�Y�e�v\�5T�J��0��԰�J)۠6����rE��:�~�8/5'I�RI��$a��R �O��GoT{��Q��i@J�&�q�@H��a4�ՋU�E���Z���@�CTO��W�1ƕlI+�)��j�g�טn�J��TK��@�h�cT-����H��-%%D��@���\�n@D�ͰC��#��R!Dst�hǮG���p�>�3�+�9��ak����mP�q]۹�K�)�Cku�`c�Q�����+�Yy�J������2.R3Ʋ"�K����E-1�6Gn4+��P����V�=�F>꒞�t;R�B�5�U�wt�Wѕ[�ܾ����ajX��V�E�X�� Z%�T9wy	�*�W;�#�f�rܫU/��ݯ��<n5�\&Z�*q���a'�­p\E�<87I��]��Z��5~B�KR{]����I35q�D����d��+5�E�mKQ���9	�����:��I�V4�t�;Z���6žm�@Ur����5z/��F/���Me�hCVT�Cb�dJ��H�~���+�j���#��qޥZVkkpB���4�GM��DH�.��7�+�]����^$�2�v\빇�8~~p��i=��N��@��v�ni ��v�nq����v
�ni���v(�N��A��w �Ny��v(��N���VJ{.���E~�S��ط��}�Sܳ!���A5������/�\��b���)�&@���z6��ݢ��)�P|ޝ?\�|߃Z���x� ��I��{�jlY�%��`DS�؛�-�x&2��<*��kXx#'��
 : 3��z�>(��k-đK��cq ���|������e�n$�G|n�FX�ޏ�Yy�)��"����4�9 �x��U�]��yOj���YM�T��S�?��}��!��ÈȬL����9p�s��^k�='�`m;�
A��x(0XMx&^���*X7S� �8q����Y}"��Dt�V����"{�$(q�!�ԘB~����:�����s��� k+D@�}�k����[)��@�=�� ��-�5����V��*��nO��6��\HP&�� �
��Y�3!�A�L��(&A�^��y\P�`C��s2������m
��p���z�% [��,aQM{~��Vzu���ݛӟ��K��v�i�Ϸk���֊�N3=�@͵�N.��,�������rf�<�"�V3����>I8�9�6�M ���D\'vw�m,ȣ�\Bq�,����9{y�O�s~�N���v� 2.ҎKEv�d'1fG�����@��`�a�C��%�D2�yI���9�"_�Y����H�6�� G�5��BR���G#̆fK�D��H���WK
ۜ?�B�fYD�y�2"���m�9dN���t�n6�85��hV"$��ɪJJ��c����`Y���<@�����\�w��$}q����ˋ۟����xs+�_�xq}u�����擩z�2h��w����X��8�2�6ܚ��5H<�Z�iz��g���eȢ���+?�B?}B���o>�̐$߰i���o��=���=C��szc @k?�WRضf�AK߄	}$f��U:.R��c1fӉ�P�μݚ�t�<�_3q1n�^�<����,��i��~n�;[�і��T�i ����#N�R��w��[��)bg�#����Hm���8�8�n�0�%���,Ŏ5�SxIS��/'_5��.��n!9q�1d)����Ŭ�1c�0��e�}�����j�-�����93������!���z����f�ݓY��٥)��q���=91v*c&l����k�uz�O_-��O(<_+�Wט���yG@T5MYu��=۸���oa?����jZ���le(. ЁBXg��_�3�ٱ)"��Z�Ae��Z-��fR:�H|,�$�U.*��%����I��Ђ���x:��G�z���*3ʱl��cUf�xH�̳��S�BVt�R��R�>�]%L��N$3�rT�G1x��BZ�ev�Z�(;aض��'FC�f~?$M��~UiN4vZ:>��S�f�����sk�3�V<��3L�q}�eڥ�o�<��hU�ɦ���c��6��`𴣯)qB*W�5�����EB|����J5r+��Io*:��?���ʊv2Q\�o��U��M����A��6��o�`=�V�*���9�oz��6J�Ƕ�nf���u(�ǖ��U�I�l��P��@?�<������̾i���?J�u�3x�����ܑ6��!����/N��E�T�S�VR�ZNG��A��=�s���pL%�=���fpRob;V�G��"��t�`${4K��+�!/��LƎ1�{Y�_�2�e��*:\�
�~ �gҦ��*\�S^�͔��(�(<U�GMa���6�I{�R[)�X�@���u'��vpT(�H٨m���Q�HS�D15[��Yke1�j�O��q3�Er����~_�a��=O��d�� Ӽv(Ͳ�=���2c��:���B�2Yaˑj~늟�xr�$N�������JE�\2d�/!3����d4cp��~v��'׼$�I�XN���s��I�d�g�*3�5�4-��L��6aǌ<�<C gؔ�TѪwZ1N"��0x��m�ɧN����PN¨O�<VV13AE�5��7�ӛ��w+<3x:m�t앢�    �P�ML*?�'��(I�՛��uJ[D�1����}	<ᨐ|�+R�h�m��t(Z}��B�8�'���D��2B��i|���E獖?z��$�3�z��Q	�Jf�Y��vD(ED1M��GbLY�wcl���vj��z��Dzm�}Z�զ�ͨ5�n�rW}���Ȯ�'�P����Ś��Q1��-c�h����Zd�a��h���նAS���55�Ѐ���h�c�ۥ����,��/`F������jDU��h�f���{C�
|��H����Tn�<(�^�T��~��:I����sY� �#K��dq�@�Y�8�#K�2��؂?�>��������I�¸�_1b|����7슕r[�	γG9�x�������3�n����W]J�B�8�o0 �����^3�)ɡVAp�t�W�7/��
���U㓗Y��=B�}x��;-)ҹG�kƸ8�����|�s���Ge�'�U����ǳK%f�9r�|��e�x��E@�6O��!����Z�l V�J7�������8���>Hó)�R��-���m�)�����	�6��̿����	+�̈́��a| s?���I�屗���8l�!�G�p��A�����Y�{F�>Q�@H���K��2�d����t�-/���5���M}�hl�r�5t Ԭ.ֽ��BpĆ��S �l�k³߯Nj�ϙ`:�Χ��~NINx�/�&踨��u^X��`#PTT���}:����D
��F�)��"�)��b ���"(0�ge�����m;c,P������>C����O �������E��5ufm��v��-����dY�����s/A��=v@����MY%}FxKL�NzE6d��������_�:��8ΩH��K�N��oy�@e٤{W�L��wsT|�m[.��rP�E��������?l<3�́s=��s8���P���xj���-�QgmУM��͚�Gj�k�	����GL'�ɴ�$��ܴ��gVg½2��#�7��֘Z��-w���b�3�q�\\�v�~,��}�M�	�!C\
�Q�%t�#���K�3�q�f%X���@=�� A:���YuG4Y�\l�l��2g�������\a+ɝJ��Hc8E�� cf3J��֨EU�6v>��#~06ٸ��+6Xu���U�5`l�(��i،�^X�Z�q�Xi�nְ�&��Y[��c�z9&zZ�
v� ˕ ��L�9ZY6�Y�w��k)�wW��-ՍeMӓ�����:g(
mw�>�jP���J���$>�%�$���'co��!N�Gx@rx0�Ѷ�&�s4�D�/��}k2:��Tf�Xyi뾡�`�C���oڡ�,��8uY�E�`��h�4y��2�G�-�S���ʇc�N���2�z� #Q��k������kJ�b�t;h
c�J�`��G���Za��j�S=�u���AI����ch�EULt�=y����KM�e�� ��G�ƾ���.�4f�UO�P���A�d%����NҢ�͚.������NJ���bt:��rT�6��a�w#ۧ����<�+Mobg�zV��F/�0:4�Y-33W� ���AB��'����fFa0q��i�zi=d�FgN��]m%�f4M@�PY�/�bt*���6{�*\�e��U�at}nX4�3��a7ha�$�+T��ѱ�PGr*�-��F�Hg��	,_w��X5Ƥ��QW�� �C��<tG=nJZ�z�iq��c-aZU�ߍr�۩�Ȇ1�%�J^�c-M"��
�����2�8]�Z�ζ[�9�H�c�j8�qA��_��ǖv�����-o�#�����=��\�����u8����N���.�|���}��?���Rp/	g�?I炑2��2 "������\m��L�m��<��M����ky��VJ����~>��l�<2Hk>ξhxЄ	~*AP��������2�A�r�tn���{�`�����h&�t.��ż
H����؁�	޹�]��x4~��%��E�ϗ t̽z|����"�;+ � m>�j����d�i��m��2�[v���d����띱#�^��~/�^z�s���v�s���ӡ����Yv��#��\ګw.�̆�R�F����̬\z�s�EXt�(i;��k�)q�}�o����K/��}�KvM�!�y&���^"!8�_���7�%�d��S	���-��	�;!/B��)���Ϙ.�fg�e���u ��R�)�����Q����U����V/�ab`��K�J�x�ST�0�]�ߏ�{�(�뿁P�#�e�CF�r����*@О��,�rYy�L,��0ve�X���B��4�O�K�%pO:#_}G:p����_s/ˑ[�%���~�N�7Bp;+ #�������մةPy&\�y�|Ĭ{s��������! v���	J�����f��~/ �����A�6�p��=�͒n�1��]��-���y��g����I~�8_=��G�����ҏ��|���.	�w�~�5��p�q)�'���4��
R�+9?�\P%������<l���d�.�B�s�P�-�-�e��$v�e��R~fVPR��*87�XQ�eg���0�fG�A�<5=�:��,_qn�#֔
�o:��ت��d�i�rnV��)�
��N]O�\s�5�lW��)$թ��7XZ3Վ�H�?1c'I�>�<)2�nkU]unu���K����m��(��O�vnj�(�ތN�n�5��Ap�ssL_��ɫ���jg�JZ#<(�l��q��|���(�?��,W=M�F����8�5���A����ԑ]a��jf(K;��s�Nqf��S�S��k�`4YF�p�ssh�!�:�زS�c�NV�})�l2֣���.�i��vif���p�&����D�U6�L���s3���r��t*@�����S���jA_fC���1�p۠�s(�j��y��\Y��Y����������u^���L���qG�`tڞCq
��1�)�*I�X�?���t(&U��8�d4%n����=�bm��DN�Xly�b��N��5-�Cu;c7��!QD�&��Z�sϣ8��Mlْѕs�����V�$�=ԣ�z�����XMCCўG�$UU�~�W��y����P��2����e��"3��"KZ��3G��<�lS%�`Y�eV��a�6��uJ��)��Le�j\kR�����4�>����N���(E���^�=���9f�؝'��m��g;��Yլ)
���:wp��QeG��P��Y��Uzc���͕��-5�t�'����WN�=��S�UjˆV+�vZV�v�����&iܙ��}�?)�$�t5�K/�P0�6e޴Fs8�,�����eKB������q�2�PR�Y]�&�IB�'�D��֫i9��$�U�3y�m�4`��m� V�`��簭#^$�U姈}F&��5���z�>�3���dY����`*��㴲\��*�O�>)����L�*Yc��3X�\nؘ��xl�x^�V���u��#������/ͥR��W��?qv�'�E�תB���5�?	#n������|��}l|�K��RTͶ�M��/�p�^� ;��\ṫ���=�/7ɵdE3L]vDr�_�����}@�HB�veߪ�l�UM�����i��r��qX��%�{��H���аA�� Ú�R�a�����'TK'�w���P��>�m}꾪��	�)if��AN*�������XK�X/.k1���v��?�>�i:ci�se�����6z�~~ ����6�3�̣�v�A��m{��@�F" �A�\��V�s�ӈ.�X6Q�9m�.��O�f�gǚ��2�O`��[���JM�y�A��|�gG ��0�S*�/3T��0�t�+S[�P�kH����ݠi���0��y�?	L��˕��בS?v٤Y
6��?ۚ!?� #�)�?�z������-9����+@R_=�fl���S���Ϥ�g�e�W���	
�>�%�s}m����M���lQ�-g-��G����|��٧j˒�׍���z�~��W���G�)3�5dr�    ��6�	�)�J�t�^:?e[�������?�X����.ΥwWo.�g߲�!o\N>�N:}���������_q������>�o��-��H�g�|��؍O���5����	Q\O8P�:+�*�CA��8b��~������Wo�c1�Xt�ȑW���ՈÚ�}��[f�s��<�������G�K/@b���E:��`V���8�f�E���.�~zs~��$��������>������������3��J)ʥ�`��Y3O��_���=�|q.^�4������������ryy������_��W�/o�E��=?}���'uys~-���>��-[Yݼ\������ťt~y&~�*z~ys���<�R��;��ӳ��.�\��ͅ\\�ܞ�ys
U�w߾>_
~�f+�����O���ҷEMB��yY�������������-����k�t��V�,O�������5��?1�H�8�O^\�]0������q����W�g7����s���O�\����e�{�������5{��{�<���������Φ�l�n��7�o/nE��.ϡ�s���5h�����������������7��/�|��c�"V��sQ��sf!�Q��������x�%�����ܑ�=}u�����g���ϥ�qV,V�g^Dص�|������Ӌ77߱����m��>�C�Upex�&ɋN6�{������v�E����o�޲��M#V���ӳ��Tl�nn��Y���|���9��36f�o�=/����VB�ﮯ�X�:�_�:_J/�|����f.��#:�nS���-���MA(����5��M��N�Qb��~�˦��{�����~��K�}/��{�y�ݥ��5?��Gэ�Y�V7?ܜ�>2K����f1FE�,���c��M��������m-oN��6e�X��_�kf�z�B?��p�*�n\5���w�f������C{y|�F(�UW5�@o~&~��G�{Ӏo�Ρ�p~>�!+Wdf�BH?Ñ�<�x�v������G���}/Y{�6��@)�Xv�e�Rckub�Y�E�\y�8t�
�@�jо�e������Lv�g��t㠳ˍ�H0��f����5.AU�����Dr�����F�L5$��s"�s���i0zֺ��VN^�a�3�:R�F&YEU<�K J���[��UՎmZ�0�(�Ү*ݶ�6"c�4��Z��%`�i|���;����3\�V'Y�L����	|��
��$�%��dBc�k�N�>K[�h�s\V�\�a��ݺ5*QƇr	���^�hD��!�5흄~�K%cWɓ��V�;�'�ٙ�r8��UQN�w�&�?'���_��L_)G�Y��6v"���\���bTT��J�"��������jm)�a~rIH�'�e��-<TAP�}�u7�&9
�Dtܵ{d��ld}Twth�F�z�d�~==� �T�'�*�a^��0��=2��K�@�I|�y4:n��_�GvhtRQ�nW��t���]P�)���^�&]�d�A�:�RW����/r	�f���!���P�4{T��հn�9	��P}�Tmdj�[A�&_�zL26H�C�Iq�a�I�7�l�+{��:�f�e~�~���P�>3po���bH��N6���z_vf)�T��R՝�뺓���S	� �S۱wĆ�!�<��S	*�j���\u-$ �=ߒ��ܾ��	���C��Tn��%P�T5�PQ�#캏KO#��E�}��Ԏ�r`���v��'��f�g'4M��éNʤ�y�>��)�iH:��������kC�v8��J�##��sqԔ�#���w�V��!�ܶIA4���He.݊[��<V�5��?%O �Wf�N�%�������5�>q��e��.-�\�m�VV⭃�/x�#����Y��fҾ=m������ﭴ���_�j*]��aU�%����u\�)�802:�+�fV^c�<��<w�!H�2���(oy���m��(Mqʁ\�!@�����N$.�/�xR\�u�y��i�R�i�6�r6�I7d�9Цil3\��\��;����m��1��2�Z�I�*"�ՌW��kX8
�Z�e�O���� �lD_�N�TU��JA��s%�/e�%6��瓂�9��9l��n��\2ք(E�ȋ�j�#!O��]P>+�
[�<,oe6���\�Б<c���� ~�d%�5Z[�y�x$$���\�!}P�����"��0w� 1;D��eqL��O-S�7��&ZuG�㜿�����̿��i(������O>�6�̈́R�O���a��Xi���vV�y���hEƺ��2C A~����%�E�q��`p"�AE!έ+��6��;��[�=��_�:b)��o�#0�0�70x:�$$����f�j|����q>/��,���|��(V�^|17&{ւg���r�+/k�D�\&��f_�"����I�!�a��a^��A3�CV#@���J��|����5�j�DR���9��!������8��gf����p���\�<^�E�V�������߀�aS��.ʷ���`��n O{4RfYgm�f�O��m��_y��c����*9O��CDJ�*�䬆����E�$W�r
��sV/���D���<3	+�E��<q�&�O�q�XO��%5��B��t���<���$�a��a~,��e]t���k��[��>�Iބ��,d�����Z�0:fݝ���!O	�8����3/g�R1��2��w��� �"�w�
�9_o=�.�yе��Z�o7q�9 ��ys6O�#���I�A��ϗ����B����Z �H�w4�{��Q� tx�����2��Zᱠ(D {Ւ�K�r�-�ω�Ѓິȸ.�L�R@�xgx��Վf9f+ 1;�{�	n�|ُs�d��N�&_��)�<v�)�g�M>I��1� �N�[&2� ���#%�M���ΐe����z��/֗o
$�؇�a��Z�^�&�OY��s}H�8�)�����d-��A`�,�0%M�Ă�)⪹�	v3��J�����J5	8�Ֆ}�a�1�ﳭ'%��ƈ���k�rSon��<S9���?����N����;(˾�����j
����%�h��v�prc���4~�H7�v�����'�Ϳ�Q��7��$y
������BA@�s����ϛ�����؛2<C�7\Xzæ@�����8���mHE�䤵�-�����U�"}��'��Ⱥv��j����%@�M{�������J� �)ݒ]����?v�}B�����,��DA���LQ�K� ���Km�/�qt���#����O�R�����R}^����֐q���\l�fG��?�	�nf{r��t�w��m�Gw�76�@�T��y�)R��)�I���\b��!׷�����(;ss��k�����OnN��g�AC�'�z�,�o����۸��	�L��U�3�3y�ufUh�(�����I�?�Ό�}Մ׋�����qP�PN���H��20B��nY�vd����c�a���X��g.�Ea`ewU��^a�!H�^�����:���|�&�H�Ӊp��� _�V\�Z {;��m����� dރ�� ���Dl;p5pN�P�e���V��yuB�ꔚyf4r.˙�1YӘ�����R��-�FI�GQ'�E�4D��)�S��b�:�ejdb�HcQ;��WeR�����5/��QwS繢Z��J���!�\�v��>u��i�ݕ�|u�RM+k�PUe�ȝ�.bNsu�&���*m�̎� ۝���ꄢN=)bT��A⑶�����NTJk+ޔ�޻�^V��غ9Q'?��,�0���ƴ�����@sK���Qj&�`u^z(u"bk{H�Lw݉L�3�tR�@�
�t4�()�&(�Ң��y���	fҩ/c[(8�����e�QW�f�΋�Q{'.��A��
u�ŢG��b�
���H.���J�i2R��
�e�2�    �0��LzPƽ=�
�����=��N�O�\�NY���B���G*Ð'�C'l���J��&n�=��,!�󤰑Z���������2s���
,�j`>3&�Ѕ�u<3�j��r�"By�T8W���>n�j&��L!���Q��Q'�8�JJ?�G�D�5}cf+���0�y��Fo��PQ�t�PG�wB���S�L��!n3�蛓�������}n8��#7b�*��u�4�z�플9vڨK'3W��^�8�:��U)��� V��i��	��^��~�NM���]Q�=�:�d�����Ė;��:�CN�O���t�u�2�JIäP2YV�n�ahҴL4h��"�̶��}Y��R�1o�~L}�J����9X�A��
���\O6Jm�B��gr`�!jS$��F��.);��%4}0��ƚ��i�y�ZyN2LSX�19|:�a��Pn��U�/4y2��L�0�Qv�Ѥ�Y������k��z4�ܞHXUvP�-�+F��LO�i8�1��RTjhPƸYcrh�R�P�g^�6-&�07�[���x��'�$!��wx��/&��ylaOLz��O��p��N�.�O�$iX�l�N6v�F��P�^R��߉4������w���U�^��_������Q�%��C�޼�F�s��E�8<��*ό%J���9U��M� "�
p¹�w%����Cc;�/�=8����OÅ�N!*Hz�R��i
L�`N�3z'���)|�rR��V@=��{�����љ��{���"����*��%壋j�A	� `
�|�7��{]��#�ܝ�U���p�rۉoRzTd�{��$�D�CJ=A6J��9oA:�O��P�L�E�=��X�.���*� H��R@	��,��<��{�w}s (�<j$�H<�����Q���b�i�V���� ��Y�����ۖ����r�h.��K�n�D#\��KX}6]��o��q��r��"#�g������`��4�W� >�p�B�f�Q�869���O]��ź�{��4�����6��:;�^+dΫ)���"h��Ϩ�e/b��'4e���%��un��
�8E�|��"�m�:��#g*`Xu�.�1���<����J?]]�9��!����Ջ�7?��9��K4��缨a�å���R v!� H�P��&A�51���6�� �nU�9����"��:��ւ��c���;��e�V���/�r�}P��(E�cSd�t��՘����̆i�+����.a>o��`�p	7J#��SBt�+>v�7|��m3j.3nm��N�B �����ǋ�WG��ū׷{�\\�<q{~Ƈ�'��l~/��������YrC��;��>��/�����9�SN �,�7��#���6�g��R��}�%RS U��}�?��<s� �'|&x���5OP
�՜<�����.Y���}�C5�~�>o ��R�� tg��>�4}�Ez@�M�;PБ��A�|v<`��oٶ���%)
@��F���"����(�=ֈY��,kS��L%�pC�ؖ�.Z
5�@E�yh�:F���p��l7���D��>��b��^��޼����G��/�Tia���7@l$��,;?�i5�����%<!��6	o����&[l�fp)]�����4���M�|��ج���Y)x8����Kv�u`�y�GR�����p6�Y�L/*P5���f��_������8��σM?�A� &)o7"��� ���M`ex_��Jϯ�C�;�??�^\��޲ѕN�_���.n�.�-.���b!���l
�	Z�, ^%�  �!��H�P��	D9VLA�Ud�X��l�
�3n�m&<i6	���O@�D�|�M���H��{�����6�
�����x�b���0Ŋ�v@�������{�H�Ey��\�떄/^*V�y���]��?ܟh�@b�.�C�m�3��O�{Yp��I^�7�l-����@45���ޗw�oʙF.��~�8����YQ��X4��	���e\�yu}��F%����8qz	��y�g�kS1����gV��[���~H2�-����/D$1�`�,=�q鮝�l?���&W���М�����p%�d;�[�\��^��L-�E�m>�·�_��dh�foO���"�����|�]�}�U�vl�i�O�R_��y��C���=iǎ"��֮�
RT��N��ԧB_�dy�c-�o����=X�������z�U�gq�����Hډ)�z=���r
}�/7L)�R�	$�?��@��~Ug���z��q�Xg���^I��=uw��#VП��p��#ݜ��SQ˩�؟#X���w��ne��Ħ#� ˱�6~X�Т`���Gҭ��T�lQQ��t�1��!|��U������"��ub�)�� l�"��I��<õHx�����3J�\r��$�,�7A��.'	��a�M5晋�` v���"�X��Uk���0jKۮ�b��@�R%!+�"v�ԼP+�%4������Y��(j��+qaN�i;n'i1F^�F-"��~JT5�ڒ*��&����Q���j�cu�%fL�٪f�J-*�,���R���If�u~,��N�.�8fK��2��jQ��iE��'�� �/:�k�W��n�t��}�z^�ʶ�/r�����Ɲ�u
կ�8˦èEa�TD�l=v*/�MZ���(6{5D������SbMk����)�j��j�6MY���/��NR�q�:��cɵgv�k}�/6���,Y�$V�rRs|�ZTye��n��+��[�l���A-*��F:h~u�@q���^�jÒ�i�(R5�n��@=���C �+eF�8+]�"}H{s��9���*�1 �}3�A�����A8�|/̂Fw�o�dP;}�����J��)i)�m��i�f�����=T�e�VF�+y?�����"ݡ�'��CY{zwY�OOt*�1�+$�\��e���=�������u#�^oۉn5S�|����ʄ�Ty}7D�BT��i[��f���UJ5���L��GO.#'D/�Js�6�#���H�=�]*���ŉ�N�Z� �P����N���]��6.�b������2���-5��l����Z�~��4���72�3��ye��M�4%�>uFo���6��%qY9H�zC[�2��L�P���c��ז���uƙt�I{��d��4i�� ��]�H��O��Ŝ���ͨ���f���	�cT�`'��/�}�-��z������x��?
�l�{3C�T���gp�h�uM��p���������� .������3 ���5�K�p���o���.���?���O��|ǥhr,�U��-恠pz^�u��_�m��%x�Anf�w�'��`�s?�s����ss��o��
 �=��,�I p���mBkpn�3l "b�V'�VB%&'I�"�Td$���M�|hm�����k��g7L��ד�)�@�DR�"w�_���1���?���_���+pwH�S<0J�s?�~h�&G	�*���ǚ�ȢA���un��Ϫ>��q��Q$�Yzq�T1[��j�YX`r� >�`#>�	@�����������7ǲr����+�s}��Gi>��O�����V�@H��~�����T���%� ��F׫Y��Uz�@z�-�.>�(��X�m�̊|Y���[=�ol5N��L@y��\G3^�K�%8�PE�Q�g����j>��XL._������tH�����`0K�̖ho���`l��@���F�7BPH<[���w
�O�5
���N"	�m�.N� ��{ؾK7Ű�WbGĔ��p����w�3������txˑ��92���"��K��ް������FrZ�=�,���y=�I
�����uey�$�]�4"B0cϦ
�ج(�/��j�l�2@�1�'��W���/���`���z�����s�ߐ��	A�E�Fp4g�}Ÿ@���)��H~3��20dƶ34�����gB!�r�]��x�    ��;:��?�j=�?AѢF`I"��(�q��΂b����k��ys8v�&�n)];�j��AP��>%vv����&�~�=;o��^"%H����ώlF�.1)��m�����4q\��|&�:�s���D�Ϲ�G�9Z���Y�܅����b��3��h�Dj#�俰C}�>!,�c����%��(J�/8���lU];�J�޼؅b��������O�ʍ�%+:�A@[��&V_q5�G�b�O|*=�wCXS��ܫN��d��~"��I��?�)Og��O.^��H'u`�ހ-b-�0��-/D�^z0R}7����}u!�*�m��l��9W��*���K�է���I/�" ��7S�����_��ޢI�
���-m� ��׀O���p�)΄�Z�!m��?�.HP�Zj�v�Q���t�����#A�F�W��Ӳ���Q uI�<�;�K)�@��3�@��I�v˗�6N�:�������T���a������:@]`˭,2t]�aTk}X�����r�3k(e�}��J�a��:�5��������}k{VEl��� �iB��m�q�UM��i�9�2��:jU�w��c��[��i|@�9�'�WY��Dihu��}��^��ak�h*�_�1ʼ��� ��O^�G�'���b/A���ڷ\���I&�ɫ'ql����NZ���,�ti�u�j�u�E��,*�9�L��L��e��]�� ��1�m'�ј��[y�*�@����;�9�6���T���wD ��`te�Ř��S����V�X�O�NJݯ��8JM�>xz�:��fj4�Ca��7�Pv� �Ԭ���-;¥܄���غ��� u܆X�a�O��i��1�� j��aDC�e`�V�rSP��"@�кx�+dxMR6}�2�Q��B$l�y��O,��'"�k�r(>]Uv�ūŦ_Lm���P��Ӗ���0���]f��y���+qDjۻ��:��M��e�w�=�z�����4:���X���d�W�+��̑Y����`ȣ#;�JU�˾�W�����!�t��
�a�~�B��֦��P�6�\UG+��8ڴ�����ǆ�%��zX+;qL��O�l�Y�=��~��8F��zk��L�&+34;sǕ�tx����|Tm-R�~T�IA���Ǳ�#J��M�B�Ӊ�cѮ���������XEbU���v�X�|�(�Y��!�5#;Z	�����J���T���'�K����#;�v��m�V���vD2#���P�}��n}f��ȣN�S��N_����kQO`F<���:��WY��#A��
��i�U	i<%=���G�|8dK/���. �Ұ�zͯ�<��2dGݸ������S1���4̙�b�,ٱ5]7�o��'w�9V����")����`5�<8�! a�]<���B)_�fH/ �9_"�!5�v�8[�r��7/��W��
��m��ϒD�����m�%E�8=zX_�9I��u��3l�h�>���l'�!"�M@ڷQ�	i��5$�ȍo���6��[ĵ P.�9����[�C�<�A�wĭ+�S-Hb�����E�¾^a�tv�qX(x��F=���o����Vw"�B(FD��A�[ �w�q'X;+��m�rh0� 6p��n�P�����,��I1
[T�Ҳ�G�z(+� ee�t��c���:��A�����\�P��e��?;+���{)�;\�3c��x;b����d�.��sBV0H�� c^�������hD�s�>E���P�0�F�l�)ş�g���5���vl�AOyX�n.�`�AQ�.��!!���:v�H�+ ��˫����<:W9f&sP���E9��̿߀��B���K��ю5U������7K��9��Lw��kVP�&(r	�x��3ɲ�] ���o���Ϣ|�����p$i'P�h����� ��������T>t��~���_=���1�7�OϮ~��^r�۫�P����k���+���f���g#;��n��Av �w�<�����J�G��xsz}*���zy{����h!��|y���ōȚ��;��/ήn�6��]�/������/���G�bS�<Yk�Z=��Zտz��R��A��V�X������s�}�d����=���U᳭��~@ ��ɳ
�o#����+�5u�;aVȘ���Y�9���F�~ɰ�ɪY�/���!�5�	"35|9[�+x𥕨e,�u^{��9�'�+��I�6s�R�M]��$cg�ތ|��O5�L#e�Rb�bU�=MT��<W*-.��Έ��ijD��*׏v����XM�u��*�����P�ET!D�2S������+��&F4�3	n��H� �_	<٢�iT�G�3a��?�
GBٴ	5%�OE���g�/��HǑ]��bD}W��3�Y]|eF9�V�q�$&�mW)���g�F�MSk4ja��p�������A�͠�B��#����JG3rǠh����i�R%���Ç_�CS�-%U�R������W�*(̌�+�6@�lN]�c��G _�/GmbV��#��(ок�l�6�r�6c4i<Ue�"n~ ��[���ih�J�4}R��;	�Hl�n��gV��箽"}|h������o�.�j3,���{�N������E�d(���q,�{r�u��*���w�WS��{�N]��ȕY���$�Y'�8�h<ޑ5�ƒ���$�be���#kmO����cB �dzz74ъ���I�G:��U���'d�z�e��wF-�������ޢ�f����;���S\ֶ�Sцa��~ߩ���h0"�Mbv%���6�$�2�������Z��'-�J�nU���嚁����7e�t$k�f�NQ���A=M}�l�t�Բ_g=2�aԉ_!#1�����M�u��TG�ǡR(ZЈ�%ۗ�)��9Z;�hr�5�k�Z�(����
�7�����65A�Ӳb��gʮ�pg�e�j$�2�[!��$\��~`u��G�&5Ҙ�c'ֈ͔gʮ%�~�����4�Ҧ�d<�w��Ńgzj�%e��!h�gʮ-f��Bu\�v��n�7��i9Zag(���VdF�j>�k�h�ۃ�L�5ǍOB#Smp�p�U��m�Uצ��Ū#�i�5N�.�U#Gy���@�-Z`��=.+��h�V��TʡY���K�8�QU��R��y���!r����
��ot-@쀚��6�Y�~�X�)�U���#ëF������=�}��m��dz&f�6y
��N�F9�6��_�8$%-W*�jE����rkXY[��+[��=������n�'�~B�8�ݢ�]C�=|���W��Z�`<TV*,'���~v�I1&u�*��oc�H����N�S�IMv�mV��s�1���+<����Lϴ�6礔�͞�.���M�)	�����6���N�δ(�z���i��7NNm0K��h�������������)�����E���9% �\wY&�c9���*�.�؜��"���Z�[��^�ҧ����ِK������KֱWA��Ҽ%�S�ŔO�|V(�G1Me5}��M����8����5x
�<����g;�T�����HH{$}��bɐ�ۥ?�g�2��&dR�w� �G����gɇ�h�5v"$�ӗy�x��~On>q>�� �`�B� nf5�|q�w�&���O�m����
��ϵ�˺k�#,�����+)à�K<z$edX e�L>&\]�' m��c��0+���-N#�|��~�+�˕)�FL�s6������[�����+>O������\�x���{�-��V͌�Q-J���'�Ub� ���G@)�Q7,���:1�H�]�ۺ������� ����αc�\�ql��,��-dk�"��|$������
Ŭ�}y�'v�/��i�����p�^yZdR�����C�!�# ���+$.��B<TnB��;�^�����>Pd[.��)��B�!#�}���?�Y �K �   )�ARzu�,�:~u���x�qc]���_3[��W׀��p���魤��� �/i��
vccz�Q4+�վ�{�uܯ1J�%s��>��i+�|hȩ$�����������o�J7���.�n�7W���g��G��pv}���r�~�iZ�$����3�����v������N�/ϯ���W7'ҫӷ�K]�� �����5b���t�������L���B�j�KU�����	m��?�|����?���      l   _   x���1�b���%��l�u��I�e��ՙ,Mvq����)nᆛll98r�]x�Oy�%o��������4b��U�J��y�������"H�      n   H  x�-���� C�P�>&�@/���0_�ČժW�k�V��՞>}�����:�K��O��k�צ'0�ۨ�:.�_���j����+�����7�F?^��~��A�^}��=.�E���+����5|V�r�P�W��K,K�R�T,j�� ��"�"�JXP�-(�[��jŲbY���ȷ�H��t%i�ґ;/�I��+���?�V��3�3d�YT�Q�F>'s����ǈz{1��n�
g�p[I[I[���U�6������![�4D�"rs2W2�1O�3CP��A�2��g����eI�W�-�Sqz�ߟ����t�      o   >  x�-�K��0��a�P��.��9����zc{l�������<��Y��9�7��V�f���91N��D����4�l�M� ���l�l�l�l�l�a&rF�g"���v!��>;��͕͕͕͕͕�uU����.D�/fd��̬����
Y�B4B��Ō��^?`��(o�7�o��������O��?�`q��������|�lp���A��I���`�L����*��>&EM�x�lp���A�w�Q9�� }6����&}���W%�!q~�,����.]֥�T�jT�n��tC]��w��ߟ���7|�$�VqZ�q�UXqbőU�,�쵪^լ�U{��w��ww�]w��uw�]�&�&�1�D`0�&X`�S_eUW�ȧi?DADC�68�'V���	�������U�R�-�(�#��n=�z��p+a*a*a*a*a*a*a*a*�މ�}��í�[����|��II�k��d/�ޔ�*{W�$nI�ݔ�Uْ�b�b�N�N�N�N�N��p���m��Ӄ��,����.��Ut�'�����^7�)      \   �   x���A� C��0���%�	\���绰f!��M��)E�~�w;?ӓS��|��/y͆����(�� y�3P� �6� 	�
	�2+�-��
A�	o7!����p>U[곥��r�>
0�eUg��h�+a(�J�'ih��!��J��quo:�����ȃ�����	��      k   `   x����0�R17^���K���H3 ��©����j�V�z������a��Hb��S,��6[��/rD_��:FS�p4�ɩ��{?���g���\      m   �  x�-�Y��(��ӧ$�^���ъ�~��5� �����d��c�X=v��qz���R�� 9�҃�� ���7�:�6�6�2�.I�O��'	� �����\T*���c�8=�l@1Ho���(��q�!:�b@2*&��y���eu��[�z;�_��E,-浘͢т~A��&����6y�����6L�m���f���27ě�l�7���������6)@~�g_�E��hU�*6�hPp���M(�m5��g~xr���a����@w���@w>%l��"PN�O|�1{��{nzΗ|�tirir�����^v��ڥT�@p�8���x���?h�\b���+�8��:@s��Ӝe��_������6Cp�<V��wl���Ɓ�z����� *�?2\������������5p~=�����+<_�K�?�3�t��ӥ&o[�5������Ta(��Op��a����z�����=��3�=Y�Td���IO'=��Nt�m���^��Ϭg�3��yF���3�LS��4\���*�S�z����薏e���g�3뙿X=�7��fd�!��3�E��D��5��C	J�����7�6�*ܿgze�&���/A��#�<	U�?�_F˪+�}�[6�z��W��qG������
x���2�������B0����<�\�t�ew/_@��a��x^�\�4��~=T��?C��jh�T�RJu(աT�RJ(U�T{R�i�Vm�K��x�����t2"�|�J?��W������
R*H`�F�Q�85��G�c�5�v�� �5'O5���ȿo�"��O*?��4�O��K�}<aR���z�c�����>#����� �k����T�R��4.��d�VC���0��xۇ��_4c��鴅�ո���ä0��ɵ��������o=ej      c     x�UP�n�@<�~E~��	�#�B_�*�=��7�H6h�_�� *zό=�5lQI[*���o٫�t$�-�߶BV���Xɏp�,J��^�Ac���K5��]�)�aF��xo��r�/|l�;���bW�(�ᩣ*��!v�r餱T�%�>�����5$�K�@M�)�Y���n�ԉMf5;ٓғ�]�z)�RF���h����b�p�ɰ8sC�}U��K�Vb/�1֎�����^S�5��E,�6M�W�5�'�cgj�����~�+�~?3��      g   �  x�m�Mr1���Sh	U�␰������	6���%#�7`�V�Gr |Z#1e�X�{�S��[7w����䌼�,i̭]��i��tf�L�Z��6L�Q��5]rC�K�Ӳf��m"��|s�u`�휛��L��V酩#y�\.mt�N���T���:XGG�C�Y�F(���=؃�V˪<���E��m��<���׹:�z������|���u�c=����TT�	]2EF�rm��K.m��+L:
-�����cL�"�Tz����+���<��`T1^y�`��� �T�anӬ_G��Ն�%�d��INgPY9:Ghw`��4��H�*9#l�WFW���\��!k����j����2ނ��es�������m<�7�I��,��;�:H�\�gZnxn�Ro�/�(��S{rp���9ס�K��Y�$ޡ�m|Nv���K܅ڷA�ϡӂ^�wR���Ն���(ɻ=.�`q1��"x!ԁ1�nC��7?s�b]�� �_�nn�      q      x������ � �      ^   U   x����  �7Na�(*��D?&�_?���wE� ej�i�dJ���}�گ_�n"�9�V���fޘ�ذ>�u��B�B-\      a   �  x�M��r�8E׍��jvJ|s)˖���VI�q��l �0	 :Q�~.H9�J��}�@�~t��]���dmP�et#C0���E�rڌ&賑����YI��-���I�n�U�ہPӲ������A�]<��H��L�� |����Z;��0��>8���DNwҙ_������
:�w�D9��?�"%�ō��c��[���[�DC{ݏFNq�	�P҄Km�Z�t��4��I:��_�>�^����h�z(·�y�����9�?���,-p���1--i�ݺ.�eiE�}�r���H� �ؠ{�҆�ҽ�UHhٽ�!�N�,F9� �S�˷�,���5Xǲ��m\R�n{ϲ�6��iT��Y��:ӱ�&��C����q6����yu;(��S���;ݞX�c݅��r�e�W�o͟��w�y��[��WG�N^�
i�k�r$z��'��چVҏ�H����i�
A;�F���lc���v�8��W��9=X�,�YоՋ������y�XQB�x(�(+*ڎ?��EM�9U� �*�k�"�o,Qc���RЋ���ʔv�,���,��V�t����hXYнS2���n�X	+�����a����9�5=��?�ʆ��G�J���U�
R�.�Գ*�fX�Qv�*�P��[;���`iAF�+��EɳE�]�1ުB����z��U�������2����Y�A�0�ktx�l�;�%��0n�h�`��g52j�E�j��ש=�b�����n�~��AU�\W��p���o_�M��A�$�~p��#l�/��%����r��4���^F��%�o�1�����F���=Yc�Z�D���M$kjzP�M�J��U*�$蚸�3D"H]�$�����H� 0;gQ��
�4� X�p�p��`�~*z�y ���#�)����\�S��Ǿa�y;��=]�nq;��Bf.UD�h�!�:�9�Jwg6��V�v�[K�1Q��\bS ؀�s��Jb��q��-�]�4Τx]��1���:y@W�HU�F���f>"�͟�g��7��H��;�W��M�����t��j�h������Hэ�s%�ܗ(p�?�f��y4��^����-��]8mՀލBu�.-񡤻s��1�"�7�d 8�R������X���1�?R�U�      _   �  x���;��@�c�X9 :�3=���t�A�Ep�L����el��=���C	!��*���mbD�S�^q�-��K�pȎ�mR��@�ti��R������t(�w|)0�"'�� Sl��xF�l �";G�6@�F�QQ"�M�L:*�Ёt\�M�����	�.䔓�*p�	UV��JNy'(�N�/w,;�s��Mq���NS?�M3�s�é��k�f��&w��{�}d�}���,/���i���V�D�"U?S��ӱ��~�.����ø���i|�����?�݋��[y͟�뇦"/t%|%�Z��@���������l�p�.�9�����_�;�Zm[�ki�����'��I�Vb�(~'��	%�i���h� ����z�Z}���#      j   G   x��̻�0�:�B��wIc	g����O�g���z�=��%�Y��'�<Υ�3��c��?zo"��C�     