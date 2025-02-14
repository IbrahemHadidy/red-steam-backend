PGDMP                        |            redsteam    16.2    16.2 z    u           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            v           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            w           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            x           1262    285676    redsteam    DATABASE     �   CREATE DATABASE redsteam WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE redsteam;
                postgres    false                        3079    285677 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            y           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    285688 
   developers    TABLE     �   CREATE TABLE public.developers (
    name character varying NOT NULL,
    website character varying NOT NULL,
    developer_id integer NOT NULL
);
    DROP TABLE public.developers;
       public         heap    postgres    false            �            1259    285693    developers_developer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.developers_developer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.developers_developer_id_seq;
       public          postgres    false    216            z           0    0    developers_developer_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.developers_developer_id_seq OWNED BY public.developers.developer_id;
          public          postgres    false    217            �            1259    285694    features    TABLE     �   CREATE TABLE public.features (
    feature_id integer NOT NULL,
    name character varying NOT NULL,
    icon bytea NOT NULL
);
    DROP TABLE public.features;
       public         heap    postgres    false            �            1259    285699    features_feature_id_seq    SEQUENCE     �   CREATE SEQUENCE public.features_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.features_feature_id_seq;
       public          postgres    false    218            {           0    0    features_feature_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.features_feature_id_seq OWNED BY public.features.feature_id;
          public          postgres    false    219            �            1259    285700    games    TABLE     �  CREATE TABLE public.games (
    game_id integer NOT NULL,
    name character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    description text NOT NULL,
    "releaseDate" timestamp without time zone DEFAULT '2024-12-20 12:56:14.302'::timestamp without time zone NOT NULL,
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
       public         heap    postgres    false            �            1259    285711    games_developers    TABLE     {   CREATE TABLE public.games_developers (
    "gamesGameId" integer NOT NULL,
    "developersDeveloperId" integer NOT NULL
);
 $   DROP TABLE public.games_developers;
       public         heap    postgres    false            �            1259    285714    games_features    TABLE     u   CREATE TABLE public.games_features (
    "gamesGameId" integer NOT NULL,
    "featuresFeatureId" integer NOT NULL
);
 "   DROP TABLE public.games_features;
       public         heap    postgres    false            �            1259    285717    games_game_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.games_game_id_seq;
       public          postgres    false    220            |           0    0    games_game_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;
          public          postgres    false    223            �            1259    285718    games_languages    TABLE     x   CREATE TABLE public.games_languages (
    "gamesGameId" integer NOT NULL,
    "languagesLanguageId" integer NOT NULL
);
 #   DROP TABLE public.games_languages;
       public         heap    postgres    false            �            1259    285721    games_pricing    TABLE     �  CREATE TABLE public.games_pricing (
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
       public         heap    postgres    false            �            1259    285730    games_pricing_pricing_id_seq    SEQUENCE     �   CREATE SEQUENCE public.games_pricing_pricing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.games_pricing_pricing_id_seq;
       public          postgres    false    225            }           0    0    games_pricing_pricing_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.games_pricing_pricing_id_seq OWNED BY public.games_pricing.pricing_id;
          public          postgres    false    226            �            1259    285731    games_publishers    TABLE     {   CREATE TABLE public.games_publishers (
    "gamesGameId" integer NOT NULL,
    "publishersPublisherId" integer NOT NULL
);
 $   DROP TABLE public.games_publishers;
       public         heap    postgres    false            �            1259    285734 
   games_tags    TABLE     i   CREATE TABLE public.games_tags (
    "gamesGameId" integer NOT NULL,
    "tagsTagId" integer NOT NULL
);
    DROP TABLE public.games_tags;
       public         heap    postgres    false            �            1259    285737 	   languages    TABLE     i   CREATE TABLE public.languages (
    language_id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.languages;
       public         heap    postgres    false            �            1259    285742    languages_language_id_seq    SEQUENCE     �   CREATE SEQUENCE public.languages_language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.languages_language_id_seq;
       public          postgres    false    229            ~           0    0    languages_language_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.languages_language_id_seq OWNED BY public.languages.language_id;
          public          postgres    false    230            �            1259    285743 
   publishers    TABLE     �   CREATE TABLE public.publishers (
    name character varying NOT NULL,
    website character varying NOT NULL,
    publisher_id integer NOT NULL
);
    DROP TABLE public.publishers;
       public         heap    postgres    false            �            1259    285748    publishers_publisher_id_seq    SEQUENCE     �   CREATE SEQUENCE public.publishers_publisher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.publishers_publisher_id_seq;
       public          postgres    false    231                       0    0    publishers_publisher_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.publishers_publisher_id_seq OWNED BY public.publishers.publisher_id;
          public          postgres    false    232            �            1259    285749    query-result-cache    TABLE     �   CREATE TABLE public."query-result-cache" (
    id integer NOT NULL,
    identifier character varying,
    "time" bigint NOT NULL,
    duration integer NOT NULL,
    query text NOT NULL,
    result text NOT NULL
);
 (   DROP TABLE public."query-result-cache";
       public         heap    postgres    false            �            1259    285754    query-result-cache_id_seq    SEQUENCE     �   CREATE SEQUENCE public."query-result-cache_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."query-result-cache_id_seq";
       public          postgres    false    233            �           0    0    query-result-cache_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."query-result-cache_id_seq" OWNED BY public."query-result-cache".id;
          public          postgres    false    234            �            1259    285755    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    positive boolean NOT NULL,
    date timestamp without time zone DEFAULT '2024-12-20 12:56:14.3'::timestamp without time zone NOT NULL,
    content character varying NOT NULL,
    user_id uuid,
    game_id integer
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    285761    reviews_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    235            �           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    236            �            1259    285762    tags    TABLE     _   CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    285767    tags_tag_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.tags_tag_id_seq;
       public          postgres    false    237            �           0    0    tags_tag_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;
          public          postgres    false    238            �            1259    285768    users    TABLE     �  CREATE TABLE public.users (
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
    "createdAt" timestamp without time zone DEFAULT '2024-12-20 12:56:14.301'::timestamp without time zone NOT NULL,
    wishlist jsonb DEFAULT '[]'::jsonb NOT NULL,
    cart jsonb DEFAULT '[]'::jsonb NOT NULL,
    library jsonb DEFAULT '[]'::jsonb NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            �            1259    285782 
   users_tags    TABLE     f   CREATE TABLE public.users_tags (
    "usersUserId" uuid NOT NULL,
    "tagsTagId" integer NOT NULL
);
    DROP TABLE public.users_tags;
       public         heap    postgres    false            i           2604    285785    developers developer_id    DEFAULT     �   ALTER TABLE ONLY public.developers ALTER COLUMN developer_id SET DEFAULT nextval('public.developers_developer_id_seq'::regclass);
 F   ALTER TABLE public.developers ALTER COLUMN developer_id DROP DEFAULT;
       public          postgres    false    217    216            j           2604    285786    features feature_id    DEFAULT     z   ALTER TABLE ONLY public.features ALTER COLUMN feature_id SET DEFAULT nextval('public.features_feature_id_seq'::regclass);
 B   ALTER TABLE public.features ALTER COLUMN feature_id DROP DEFAULT;
       public          postgres    false    219    218            k           2604    285787    games game_id    DEFAULT     n   ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);
 <   ALTER TABLE public.games ALTER COLUMN game_id DROP DEFAULT;
       public          postgres    false    223    220            r           2604    285788    games_pricing pricing_id    DEFAULT     �   ALTER TABLE ONLY public.games_pricing ALTER COLUMN pricing_id SET DEFAULT nextval('public.games_pricing_pricing_id_seq'::regclass);
 G   ALTER TABLE public.games_pricing ALTER COLUMN pricing_id DROP DEFAULT;
       public          postgres    false    226    225            w           2604    285789    languages language_id    DEFAULT     ~   ALTER TABLE ONLY public.languages ALTER COLUMN language_id SET DEFAULT nextval('public.languages_language_id_seq'::regclass);
 D   ALTER TABLE public.languages ALTER COLUMN language_id DROP DEFAULT;
       public          postgres    false    230    229            x           2604    285790    publishers publisher_id    DEFAULT     �   ALTER TABLE ONLY public.publishers ALTER COLUMN publisher_id SET DEFAULT nextval('public.publishers_publisher_id_seq'::regclass);
 F   ALTER TABLE public.publishers ALTER COLUMN publisher_id DROP DEFAULT;
       public          postgres    false    232    231            y           2604    285791    query-result-cache id    DEFAULT     �   ALTER TABLE ONLY public."query-result-cache" ALTER COLUMN id SET DEFAULT nextval('public."query-result-cache_id_seq"'::regclass);
 F   ALTER TABLE public."query-result-cache" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            z           2604    285792    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    236    235            |           2604    285793    tags tag_id    DEFAULT     j   ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);
 :   ALTER TABLE public.tags ALTER COLUMN tag_id DROP DEFAULT;
       public          postgres    false    238    237            Z          0    285688 
   developers 
   TABLE DATA           A   COPY public.developers (name, website, developer_id) FROM stdin;
    public          postgres    false    216   ˠ       \          0    285694    features 
   TABLE DATA           :   COPY public.features (feature_id, name, icon) FROM stdin;
    public          postgres    false    218   2�       ^          0    285700    games 
   TABLE DATA           I  COPY public.games (game_id, name, category, description, "releaseDate", featured, "thumbnailEntries", "imageEntries", "videoEntries", "languageSupport", "platformEntries", link, about, mature, "matureDescription", "systemRequirements", legal, "totalSales", "averageRating", "reviewsCount", pricing_id, "storageName") FROM stdin;
    public          postgres    false    220   
      _          0    285711    games_developers 
   TABLE DATA           R   COPY public.games_developers ("gamesGameId", "developersDeveloperId") FROM stdin;
    public          postgres    false    221   ��      `          0    285714    games_features 
   TABLE DATA           L   COPY public.games_features ("gamesGameId", "featuresFeatureId") FROM stdin;
    public          postgres    false    222   '�      b          0    285718    games_languages 
   TABLE DATA           O   COPY public.games_languages ("gamesGameId", "languagesLanguageId") FROM stdin;
    public          postgres    false    224   ��      c          0    285721    games_pricing 
   TABLE DATA           �   COPY public.games_pricing (pricing_id, free, discount, "discountStartDate", "discountEndDate", "offerType", "basePrice", "discountPrice", price, "discountPercentage") FROM stdin;
    public          postgres    false    225   ��      e          0    285731    games_publishers 
   TABLE DATA           R   COPY public.games_publishers ("gamesGameId", "publishersPublisherId") FROM stdin;
    public          postgres    false    227   ��      f          0    285734 
   games_tags 
   TABLE DATA           @   COPY public.games_tags ("gamesGameId", "tagsTagId") FROM stdin;
    public          postgres    false    228   e�      g          0    285737 	   languages 
   TABLE DATA           6   COPY public.languages (language_id, name) FROM stdin;
    public          postgres    false    229   N�      i          0    285743 
   publishers 
   TABLE DATA           A   COPY public.publishers (name, website, publisher_id) FROM stdin;
    public          postgres    false    231   u�      k          0    285749    query-result-cache 
   TABLE DATA           _   COPY public."query-result-cache" (id, identifier, "time", duration, query, result) FROM stdin;
    public          postgres    false    233   �       m          0    285755    reviews 
   TABLE DATA           W   COPY public.reviews (review_id, positive, date, content, user_id, game_id) FROM stdin;
    public          postgres    false    235   �       o          0    285762    tags 
   TABLE DATA           ,   COPY public.tags (tag_id, name) FROM stdin;
    public          postgres    false    237         q          0    285768    users 
   TABLE DATA             COPY public.users (user_id, email, username, password, country, "phoneNumber", "profilePicture", "verificationToken", "isVerified", "phoneVerificationCode", "isPhoneVerified", "passwordResetToken", "isAdmin", "isActive", "isLoggedIn", "createdAt", wishlist, cart, library) FROM stdin;
    public          postgres    false    239   �      r          0    285782 
   users_tags 
   TABLE DATA           @   COPY public.users_tags ("usersUserId", "tagsTagId") FROM stdin;
    public          postgres    false    240   "      �           0    0    developers_developer_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.developers_developer_id_seq', 31, true);
          public          postgres    false    217            �           0    0    features_feature_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.features_feature_id_seq', 27, true);
          public          postgres    false    219            �           0    0    games_game_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.games_game_id_seq', 25, true);
          public          postgres    false    223            �           0    0    games_pricing_pricing_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.games_pricing_pricing_id_seq', 25, true);
          public          postgres    false    226            �           0    0    languages_language_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.languages_language_id_seq', 32, true);
          public          postgres    false    230            �           0    0    publishers_publisher_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.publishers_publisher_id_seq', 24, true);
          public          postgres    false    232            �           0    0    query-result-cache_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."query-result-cache_id_seq"', 1, false);
          public          postgres    false    234            �           0    0    reviews_review_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_review_id_seq', 19, true);
          public          postgres    false    236            �           0    0    tags_tag_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tags_tag_id_seq', 142, true);
          public          postgres    false    238            �           2606    285884 $   games PK_00f32d6507b00b23b8cd327fba7 
   CONSTRAINT     i   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "PK_00f32d6507b00b23b8cd327fba7" PRIMARY KEY (game_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "PK_00f32d6507b00b23b8cd327fba7";
       public            postgres    false    220            �           2606    285886 #   tags PK_06a35221325edeb80ad2ec1ff85 
   CONSTRAINT     g   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_06a35221325edeb80ad2ec1ff85" PRIMARY KEY (tag_id);
 O   ALTER TABLE ONLY public.tags DROP CONSTRAINT "PK_06a35221325edeb80ad2ec1ff85";
       public            postgres    false    237            �           2606    285888 (   languages PK_108420613c85f301619cf49234d 
   CONSTRAINT     q   ALTER TABLE ONLY public.languages
    ADD CONSTRAINT "PK_108420613c85f301619cf49234d" PRIMARY KEY (language_id);
 T   ALTER TABLE ONLY public.languages DROP CONSTRAINT "PK_108420613c85f301619cf49234d";
       public            postgres    false    229            �           2606    285890 )   developers PK_3654a1cdb53b1c2af298a93be3e 
   CONSTRAINT     s   ALTER TABLE ONLY public.developers
    ADD CONSTRAINT "PK_3654a1cdb53b1c2af298a93be3e" PRIMARY KEY (developer_id);
 U   ALTER TABLE ONLY public.developers DROP CONSTRAINT "PK_3654a1cdb53b1c2af298a93be3e";
       public            postgres    false    216            �           2606    285892 )   games_tags PK_37631a5e36fe26063bc7d4e6498 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "PK_37631a5e36fe26063bc7d4e6498" PRIMARY KEY ("gamesGameId", "tagsTagId");
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "PK_37631a5e36fe26063bc7d4e6498";
       public            postgres    false    228    228            �           2606    285894 1   query-result-cache PK_6a98f758d8bfd010e7e10ffd3d3 
   CONSTRAINT     s   ALTER TABLE ONLY public."query-result-cache"
    ADD CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY (id);
 _   ALTER TABLE ONLY public."query-result-cache" DROP CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3";
       public            postgres    false    233            �           2606    285896 -   games_features PK_721440dcc12fe425e7365848ecf 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "PK_721440dcc12fe425e7365848ecf" PRIMARY KEY ("gamesGameId", "featuresFeatureId");
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "PK_721440dcc12fe425e7365848ecf";
       public            postgres    false    222    222            �           2606    285898 /   games_publishers PK_8210a5d0a29975eca0b7c1d1070 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "PK_8210a5d0a29975eca0b7c1d1070" PRIMARY KEY ("gamesGameId", "publishersPublisherId");
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "PK_8210a5d0a29975eca0b7c1d1070";
       public            postgres    false    227    227            �           2606    285900 .   games_languages PK_8e72b9c3144c27c370c3bed136c 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "PK_8e72b9c3144c27c370c3bed136c" PRIMARY KEY ("gamesGameId", "languagesLanguageId");
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "PK_8e72b9c3144c27c370c3bed136c";
       public            postgres    false    224    224            �           2606    285902 $   users PK_96aac72f1574b88752e9fb00089 
   CONSTRAINT     i   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089";
       public            postgres    false    239            �           2606    285904 ,   games_pricing PK_9d094279e2ae1d10d9190cc148f 
   CONSTRAINT     t   ALTER TABLE ONLY public.games_pricing
    ADD CONSTRAINT "PK_9d094279e2ae1d10d9190cc148f" PRIMARY KEY (pricing_id);
 X   ALTER TABLE ONLY public.games_pricing DROP CONSTRAINT "PK_9d094279e2ae1d10d9190cc148f";
       public            postgres    false    225            �           2606    285906 &   reviews PK_bfe951d9dca4ba99674c5772905 
   CONSTRAINT     m   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "PK_bfe951d9dca4ba99674c5772905" PRIMARY KEY (review_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "PK_bfe951d9dca4ba99674c5772905";
       public            postgres    false    235            �           2606    285908 )   publishers PK_d25990ded6d8012396ef6c10767 
   CONSTRAINT     s   ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT "PK_d25990ded6d8012396ef6c10767" PRIMARY KEY (publisher_id);
 U   ALTER TABLE ONLY public.publishers DROP CONSTRAINT "PK_d25990ded6d8012396ef6c10767";
       public            postgres    false    231            �           2606    285910 '   features PK_d9dfbe2f2d417905e38c3b1bfae 
   CONSTRAINT     o   ALTER TABLE ONLY public.features
    ADD CONSTRAINT "PK_d9dfbe2f2d417905e38c3b1bfae" PRIMARY KEY (feature_id);
 S   ALTER TABLE ONLY public.features DROP CONSTRAINT "PK_d9dfbe2f2d417905e38c3b1bfae";
       public            postgres    false    218            �           2606    285912 )   users_tags PK_e56a45a71b04e7f614dbd141184 
   CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "PK_e56a45a71b04e7f614dbd141184" PRIMARY KEY ("usersUserId", "tagsTagId");
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "PK_e56a45a71b04e7f614dbd141184";
       public            postgres    false    240    240            �           2606    285914 /   games_developers PK_f4fc96b9ca229d9159425d00b3e 
   CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "PK_f4fc96b9ca229d9159425d00b3e" PRIMARY KEY ("gamesGameId", "developersDeveloperId");
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "PK_f4fc96b9ca229d9159425d00b3e";
       public            postgres    false    221    221            �           2606    285916 $   games REL_fa5e581bc2c90e64529e286ca2 
   CONSTRAINT     g   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "REL_fa5e581bc2c90e64529e286ca2" UNIQUE (pricing_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "REL_fa5e581bc2c90e64529e286ca2";
       public            postgres    false    220            �           2606    285918 $   games UQ_28639e6be5f363b0257ec04e14f 
   CONSTRAINT     a   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f" UNIQUE (name);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f";
       public            postgres    false    220            �           2606    285920 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public            postgres    false    239            �           2606    285922 $   games UQ_cc87e84f58757a2aa892996e0fb 
   CONSTRAINT     j   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "UQ_cc87e84f58757a2aa892996e0fb" UNIQUE ("storageName");
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "UQ_cc87e84f58757a2aa892996e0fb";
       public            postgres    false    220            �           2606    285924 $   users UQ_fe0bb3f6520ee0469504521e710 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710";
       public            postgres    false    239            �           1259    285925    IDX_087d6d70218c721dda01d0d7a0    INDEX     ^   CREATE INDEX "IDX_087d6d70218c721dda01d0d7a0" ON public.games_tags USING btree ("tagsTagId");
 4   DROP INDEX public."IDX_087d6d70218c721dda01d0d7a0";
       public            postgres    false    228            �           1259    285926    IDX_0ce44bcc42a9812ac7f5c3cb27    INDEX     e   CREATE INDEX "IDX_0ce44bcc42a9812ac7f5c3cb27" ON public.games_languages USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_0ce44bcc42a9812ac7f5c3cb27";
       public            postgres    false    224            �           1259    285927    IDX_54d7c2f9e0970e204bca905d84    INDEX     ^   CREATE INDEX "IDX_54d7c2f9e0970e204bca905d84" ON public.users_tags USING btree ("tagsTagId");
 4   DROP INDEX public."IDX_54d7c2f9e0970e204bca905d84";
       public            postgres    false    240            �           1259    285928    IDX_581f665b8e1a665600c06581e2    INDEX     m   CREATE INDEX "IDX_581f665b8e1a665600c06581e2" ON public.games_languages USING btree ("languagesLanguageId");
 4   DROP INDEX public."IDX_581f665b8e1a665600c06581e2";
       public            postgres    false    224            �           1259    285929    IDX_5c7c4ff7ecb8ed0ad5f3b65558    INDEX     p   CREATE INDEX "IDX_5c7c4ff7ecb8ed0ad5f3b65558" ON public.games_publishers USING btree ("publishersPublisherId");
 4   DROP INDEX public."IDX_5c7c4ff7ecb8ed0ad5f3b65558";
       public            postgres    false    227            �           1259    285930    IDX_6f64008706763b172c4b2d7f39    INDEX     f   CREATE INDEX "IDX_6f64008706763b172c4b2d7f39" ON public.games_developers USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_6f64008706763b172c4b2d7f39";
       public            postgres    false    221            �           1259    285931    IDX_72ae624da5548e602a1d84047f    INDEX     d   CREATE INDEX "IDX_72ae624da5548e602a1d84047f" ON public.games_features USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_72ae624da5548e602a1d84047f";
       public            postgres    false    222            �           1259    285932    IDX_95584abd9a452f258dd69901e2    INDEX     j   CREATE INDEX "IDX_95584abd9a452f258dd69901e2" ON public.games_features USING btree ("featuresFeatureId");
 4   DROP INDEX public."IDX_95584abd9a452f258dd69901e2";
       public            postgres    false    222            �           1259    285933    IDX_c0c7b8ce8e0e786ca57c57f982    INDEX     p   CREATE INDEX "IDX_c0c7b8ce8e0e786ca57c57f982" ON public.games_developers USING btree ("developersDeveloperId");
 4   DROP INDEX public."IDX_c0c7b8ce8e0e786ca57c57f982";
       public            postgres    false    221            �           1259    285934    IDX_c2513018e2c3dbfe7eaee4cc88    INDEX     `   CREATE INDEX "IDX_c2513018e2c3dbfe7eaee4cc88" ON public.games_tags USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_c2513018e2c3dbfe7eaee4cc88";
       public            postgres    false    228            �           1259    285935    IDX_c79bfdc4074332c6b8b7b95cb1    INDEX     f   CREATE INDEX "IDX_c79bfdc4074332c6b8b7b95cb1" ON public.games_publishers USING btree ("gamesGameId");
 4   DROP INDEX public."IDX_c79bfdc4074332c6b8b7b95cb1";
       public            postgres    false    227            �           1259    285936    IDX_e4142465994684d8d568daeec2    INDEX     `   CREATE INDEX "IDX_e4142465994684d8d568daeec2" ON public.users_tags USING btree ("usersUserId");
 4   DROP INDEX public."IDX_e4142465994684d8d568daeec2";
       public            postgres    false    240            �           2606    285937 )   games_tags FK_087d6d70218c721dda01d0d7a0d    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "FK_087d6d70218c721dda01d0d7a0d" FOREIGN KEY ("tagsTagId") REFERENCES public.tags(tag_id);
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "FK_087d6d70218c721dda01d0d7a0d";
       public          postgres    false    4785    237    228            �           2606    285942 .   games_languages FK_0ce44bcc42a9812ac7f5c3cb272    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "FK_0ce44bcc42a9812ac7f5c3cb272" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "FK_0ce44bcc42a9812ac7f5c3cb272";
       public          postgres    false    224    4747    220            �           2606    285947 )   users_tags FK_54d7c2f9e0970e204bca905d84d    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "FK_54d7c2f9e0970e204bca905d84d" FOREIGN KEY ("tagsTagId") REFERENCES public.tags(tag_id);
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "FK_54d7c2f9e0970e204bca905d84d";
       public          postgres    false    4785    237    240            �           2606    285952 .   games_languages FK_581f665b8e1a665600c06581e21    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_languages
    ADD CONSTRAINT "FK_581f665b8e1a665600c06581e21" FOREIGN KEY ("languagesLanguageId") REFERENCES public.languages(language_id);
 Z   ALTER TABLE ONLY public.games_languages DROP CONSTRAINT "FK_581f665b8e1a665600c06581e21";
       public          postgres    false    224    4777    229            �           2606    285957 /   games_publishers FK_5c7c4ff7ecb8ed0ad5f3b655582    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "FK_5c7c4ff7ecb8ed0ad5f3b655582" FOREIGN KEY ("publishersPublisherId") REFERENCES public.publishers(publisher_id);
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "FK_5c7c4ff7ecb8ed0ad5f3b655582";
       public          postgres    false    227    231    4779            �           2606    285962 /   games_developers FK_6f64008706763b172c4b2d7f39f    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "FK_6f64008706763b172c4b2d7f39f" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "FK_6f64008706763b172c4b2d7f39f";
       public          postgres    false    221    220    4747            �           2606    285967 &   reviews FK_728447781a30bc3fcfe5c2f1cdf    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf";
       public          postgres    false    235    239    4787            �           2606    285972 -   games_features FK_72ae624da5548e602a1d84047f8    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "FK_72ae624da5548e602a1d84047f8" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "FK_72ae624da5548e602a1d84047f8";
       public          postgres    false    222    220    4747            �           2606    285977 -   games_features FK_95584abd9a452f258dd69901e2a    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_features
    ADD CONSTRAINT "FK_95584abd9a452f258dd69901e2a" FOREIGN KEY ("featuresFeatureId") REFERENCES public.features(feature_id);
 Y   ALTER TABLE ONLY public.games_features DROP CONSTRAINT "FK_95584abd9a452f258dd69901e2a";
       public          postgres    false    4745    222    218            �           2606    285982 &   reviews FK_98c034c1b44b843c9c4641b1dbe    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_98c034c1b44b843c9c4641b1dbe" FOREIGN KEY (game_id) REFERENCES public.games(game_id);
 R   ALTER TABLE ONLY public.reviews DROP CONSTRAINT "FK_98c034c1b44b843c9c4641b1dbe";
       public          postgres    false    235    220    4747            �           2606    285987 /   games_developers FK_c0c7b8ce8e0e786ca57c57f982e    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_developers
    ADD CONSTRAINT "FK_c0c7b8ce8e0e786ca57c57f982e" FOREIGN KEY ("developersDeveloperId") REFERENCES public.developers(developer_id);
 [   ALTER TABLE ONLY public.games_developers DROP CONSTRAINT "FK_c0c7b8ce8e0e786ca57c57f982e";
       public          postgres    false    221    4743    216            �           2606    285992 )   games_tags FK_c2513018e2c3dbfe7eaee4cc889    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_tags
    ADD CONSTRAINT "FK_c2513018e2c3dbfe7eaee4cc889" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.games_tags DROP CONSTRAINT "FK_c2513018e2c3dbfe7eaee4cc889";
       public          postgres    false    4747    220    228            �           2606    285997 /   games_publishers FK_c79bfdc4074332c6b8b7b95cb17    FK CONSTRAINT     �   ALTER TABLE ONLY public.games_publishers
    ADD CONSTRAINT "FK_c79bfdc4074332c6b8b7b95cb17" FOREIGN KEY ("gamesGameId") REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.games_publishers DROP CONSTRAINT "FK_c79bfdc4074332c6b8b7b95cb17";
       public          postgres    false    227    4747    220            �           2606    286002 )   users_tags FK_e4142465994684d8d568daeec2d    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_tags
    ADD CONSTRAINT "FK_e4142465994684d8d568daeec2d" FOREIGN KEY ("usersUserId") REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.users_tags DROP CONSTRAINT "FK_e4142465994684d8d568daeec2d";
       public          postgres    false    4787    240    239            �           2606    286007 $   games FK_fa5e581bc2c90e64529e286ca23    FK CONSTRAINT     �   ALTER TABLE ONLY public.games
    ADD CONSTRAINT "FK_fa5e581bc2c90e64529e286ca23" FOREIGN KEY (pricing_id) REFERENCES public.games_pricing(pricing_id);
 P   ALTER TABLE ONLY public.games DROP CONSTRAINT "FK_fa5e581bc2c90e64529e286ca23";
       public          postgres    false    225    220    4767            Z   W  x�}T[r�@�fN�a�v�0�.�68�$U���V^#����pn�s�b�}@$p�S��������<�Dw�ōc��Vk�qf���*Z�6$�h(��,�4{�f���n�B���.�#n��̅��Ԭ2�ʚ�Q
�*��L[�ut���u����.�hUL��lP��fFp��u�j���mE4��֨���b���)G#�p�'_���9�I��"��^�a� y��j��i����s����;YRevH�5D�*��)�ט�d/T'�Q��{�m����h����du.��	|M��G�JR˘�E�+��\��PD#,���ȱϩcIK����B�T�NY����gpOwf����Gv�ū	z��uݨ���L⒨�p��p)�JL�\���`XK�	��xI����r�`Ҁ��&$������߭��i*b�a������jG��L��Pd�l�e��]٦�s�����wz�yt�N���1�`� ��Hl��.gp�5%�ydF�df�
d=Y��,>��H���	'���a<ؓޚ�b� ���>cV��,��`��s{K�FrM[���j�6���/�ݶ      \      x���]�.;��	ӿb���v�%�tX�mc�fS�Xe���>+�&#ɴ�?��6�6P�����M��x�}����q���~���?���������������|��ʵ��կ����RM)Ǐ_���_��|���}�x��Z�������<OI�<��'_W
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
� 5�n�(��|�k�n!Y81�&�F�go3���U�B����U	��vLh��]_�<�,����A���Hy"�u+�Eb+3��}H1�Rμ��ʳ�Ŀf�bL ��H$X?��Kt߲���U�8�Y�4D��;��Т�.U��0�Y�n"��$r�A`�T���B�q�ֲߢ[4��lcߺ��B�����,=#4fG���4T[���0�a-����[2��ycI\��a�\jo�i%5�����F�ٺ�n�cU<��D��T��ccE͖��f���p�������O>Z�n������|O�����3�q��խ#��Jm�σ��_�m<���:�/�loGwm�+*�͒�n�W���;1��<=#sO�?&�?��/��;m�s      ^      x��۲�6�.|�~
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
ݖ%��'��<�c�m���y.�7��u0�) T9���:-��9g{Q���>U��ƿ��Ҷ봘l�*2�TIȆ���4/��jD	M:?��yV�>�Ii�J\�Sgڎ��IZ��Wo9)Ia�DUS�-��jj"{>}��2��9V���	��lU3��ߔ����fH	vT&�!c�Y��NJ:�L☝�طc�@�\���1�h������E�w����1NJ�w���|��;��ZW��'�e8uu�q'�k�B��8β)8�IFIE���c��ܤ51�����٫!��ޘ���kZ��m��R�TshU��i����g�I����duǒk��5�:Z老I�tf�>�Kb�-'5��g���W&J�&�Q�Y��ʶ+Z�N�rp;m���Qg�����%s&:�jf�$��%�z���<t%Vʌ���r�H�%���
d,:�39`<Z2�f��1�FZ�4s��qQ 
@1�Y*DrQн�u.J$7��)�%�Wx6��Q�)���:\�:�s�5�t�t���!��a�2nFW�����a�qP%��+���� X�fA��ط}2���wM���J��)i)�m��i�f�
e��k�.�p��}o���Jޏ��5e��Z�;����e��}�eQ��@w�h�q�X!1亵�-��7��SV�r�ʺ�U���D��)X�zO:S����
Q-��yl��{Je@!8�B�RM�3?�l��+:u��	�˩Ҝ�M�H�m2�p��.�GTi��DM�T�Uc�
1���E3�6������P��P���efKM�k=� ����kZ���1���t���([��l
�)��oL�&��0l�
)Q����7��P��ޘN�P���c��ז���ڍ�3龓�n�*Ii��#N�Ӕ�R�ߔ��_��_��ׯB-���xE~7��L?d[�eo�͇�_�_�¯~� 2��+䩈L��5U�IE�I:�~L�H;�S.�LB�	Na�ҍgۃl@5�������� ������H���o����]���o�{���o��;B���H(	a�dG�=o%M@}�-�^�E�]�XA{.��Z��ϯ�^��p�������_7��A&8��S� � �R�%��!�J!��.%�f�,��s�þ+2��E'٠\bG�ܰ���k��Ȯx�	�'��lQ�
����F���OpQ��K����8\��X+�u魿���E���RQ���_j��l�_(	sq����xC ��;Z	���=�rm�O��[����ҋۦ
k����#A���g��!h	N�FM�����8�؃�~s}{su,+�ԓ�_��? qn�=�����>�G�D�O�D�<Gr֚r�\⠎�ꄍ�W�����>
��#���8��b��a�2/���͡[=۰�b&�p�]2��^��挕�$~�M���!@�.D< ��'t�8�jn[HL&�O������:���)G=2���F�}��t�����53�E�M����2='�B�'d^�|�D`�/�w|�Fx��m���Ԡ��)N�үr�4�m��o����)fC��5�5GF�ʑ��g��F��A���ް��$�p���`���;!<����.)����J`�_�'��2�Y���4"�H1��S�x��"�	�i �g��O��f�H6y3�����u�W�~���_}����^Ͽ�#mv�C,�x�DH	w$�;��I�P�ro|��F�%7�ݖl� =,޷Hl��ٳ��'ք�v�o=>�&���ߛiQ��{�`t�_w�O�+��-3&���?�;�L���\Bs����O��k�w��� >�A���O��t�IRU����6I��{���<��L�*�; J�3f����1R�)[h!Dʇ�s������n�=��+V�?�+��cd���þ���I1M�TY�RȆ>�lS_��G�^�|�Q���c0�O��s>�mNJZۣJ�^�H�Z��c�l�RF�_m2)^���T���<��j['|-Y}���1���aြ?�;�%
����2�{'��n���W�l��?m?������ʳ�Y+�Vk��!1�t�p��j�@0�(���}!��R >�Zd����.�hK�1�7DPV-8E��6)�g��ߨ�7wY�9���\6I����K�8 ����7g,�W�Q�k$������˂��]�!���"�-��V�c	�T0���I���{�����'@��ǲs��O������{�FTj�>]�qDd��H����Uk���8|@]R%��N�R��.P1�L�P'qD�����婍ӆ��/��� j���>��uX)�b(a�P�r+�]v�Z���#� �����J��F�$��d��@�ۚ�vz��mdྵ=�"�K�C �4!n���6�8ʪ�W�4�@]�!��Q���SM���ҼL� jϱ�8)���$JC�+��s 5�ʠ5[sFS���qP�=X^N���+����^�%��� P��+wޠ5��99d�l�c�T=�v��g�K���US��/�eQ��Aeef-.�6�ʰ@]�yo;8���T�ʻV�� j%�U��!��)��TĥڕT    '�P{FW�~Z�y�L1e�a��@m%�U�d�����
k��Ԥ�W���ԙ�7�P�)
�G�a���P�f�T�n�.�7��غ��� u܆X�a�O��i��1�� j��aDC�e`�V�rSP{E��8/p��Iʦ��Pf'�t�vI4���/d�X��OD���P|���&`�W�M���Nqݡ�ç--��aP{7��*7��7V	���ԶwQ�uvݛ���~�*{ �Py}��it��ӱZ;�P9�汣T9�d��k�6C�!{ u������D�*/{uH5Ǻ�Bi80Y����i�.��� WF�ъ}��6m���;y�au�m������O*u7�^>�n]v�D��!|���4���5B;ӽ�����qM\n5Y�c�����|Tm-R�~T�IA�q�8VB}D)��2�)�<��>�ʌz4|oj�h�U$V5ډmg������^�5��b{Q3�����|������q3�}e�I��(�c���N��*oۨ�1�Æ����ň��9�G�˱��[�9�$�����W��*;�ZT��O�=�CC-�U��:��D�o��m����5����)_�xbɇsA����O	�5�^����``��n��ŭ�/������/ga^p���` ;���..�/s��+��!��PV��1*VÕ���T���4S�UEP�!����/�f�i�6!:�.YF��@e�ί^nã$�u�;��~�'Y�rv���}����(��	G)�NH����D`.�ru����.���xE�l冹�vҾ�j��Rܖ��c^J ��]
g�{y���F"�J�U��B�-n�
�XM#�;I|Ej2�m[`�d��G��%dف}�w`{�6��b@9�l$ ���G�z!��nr,b$�9��k��V�즅l><G��M޲����>�`-�6�	2�@����0$t�kj@YhX^:.p�9�b��>�e-O
桬h��9������3�o�R�4f�Ҋ�۹�\��j�yQ���	����^
�n�"�a��£Y�����LO\�rY���ҋx\&�sj��L4��n�����Jlj��B}ܞ�cp%����vl�AO=���y��%a�����-�)τ����d�?r��]������)��c�2U�~9��eQ�+>��zq�Т$d�vP+�k�*K���W�V@�.��P�F n�͌W�9�,kO�+�ŧe�����Ct�>��Y�Κ�Ñ��@��i�;���[���@ȳ�ߏ�?I��~l�~�P�;���ܽ9;��Q�y%ݿ���o�B-.�/n�?��h���A�U:�6�x���+a���i�ş y��˻������quv{&���yu������ٕt�����˗wBa��;�..�o�6���1^�Æ�//�_P�����u0��d��h�H`�7���[6��?p/')���;޼�nQ�������	��H�����dMpW᳥��~@yx��o��F�%7ʲ��K�	�z@��H�|i�1��) aq4G�>�7m��!�5�"35|=Y>N+Q�X���d�s
O�����f�[���˹�d�lқѓ���󩦚i���`OrТX��D���s����o댸z��F�4�r��A�`��ȝ�դ_��B�P:��U^DB�(3���
|��e�u#�؞�QX�� �_	<٢�iT�G�3a��?�
GB�ل��掉��IR�3��BQ���.�J1�����̬.�2�P��8u��+��~�"��A6M�Ѩ�����.��Wf�h�}3����Hp��_ ��ь�1(c(�~�Tɭ)��������lKEIUv�T-���"��

3��ʴ� �S���*O��S|9j��u_Q7�F��=x��M6zC�u�C�1��4��2��މj�M�F�44b�R�>����i$6t��z���3�^�sw-KΡ�N�SKg�X]0�fXR'���N1?�]�d�P8E�Xf�E|��I&{��j��������S�f�re��h&�g։>9Z�w�Aͦ���9�%ɧX�~.#Yk{J��Oh'�ӻ���/�;���E��J�4���Po�l�{�Ψ�}һ93�|�-ZiV^�^���w �c:N?�em�-1m�x���:i�!�#��$fGҺ�jcLV���;��b�d�ھ>i�?Pwc��}x'7,�l���)��#Y��0ӿ�y��_GPOS�2��4�"����Oe��0�į��a�q�x�J���TF�ɬ��C�P� �K�.A�������E�ۖ��\��rE)�5,�P��Q�'D���	���;��*�nxmh�u���ʐn�8�p�:���1�v]��Hc~��X#f)�ʮ'�~�����4�Ҧ�d<�w��Ńgzj�%e��!h�Se/���3�R��&w����N��
;C9l�"�0BW�_kPE���Se�7>	}�L��1¹W>��V]3�C�1�UGN��k��<+�F�r��:�@�-Z`��=.+��h�V��TʡY���K�8�QU��R��9Uv]���h�Cnu�7� �Aͽ�Se5��c`�t�bT�ǆC�������N��8��޷U�/�i�m��ɚ�<`՝4�rvl2Y��qHJZk�r�F�Q$.;o0�[����B]�X�����}l�u+�8I�s��A���z��CdT����s�,S*,'���~��I1&]�Y�Ҿ�]#�Ҧ:-N�&5I�M���k�q�]�y�ue:�KY��Rf'{b��n�4��$�W���Xf�N8��:Ӣ��e\����m��89��<Y���M⺪ʶ��������S���*��W���,2�w%�/%���e�o,g��c���l8�{�K7m-�ȭ������ާ���0ű���aoP~�DT7A���yK�_LES>)�Y��R�4�'��&Hau�) t�wnq�B�F~�Z޳��b-�`��G҃l�������]�xs>�#i�w�/y�R�r�+t(��_�r�	����!�5}y�w�9����c��XrsF.m��B���:�b1ヺ2�!����b��ϓ�u֘GX���w���GRF�Rf��c�
� �6��h�m�Y�oq���g�G\+w[��i! ʠ��!������M;�>�?0�W<O��C��hAc��{�-��V�L�X�RC�[*�G �e����}T�(������=	�H�
]�ۺ�����;��(����cǰ��؄4\�c�ǚ�)2G�7�j�%�Z�c���\H�Ad�-ď:����g�_�Y��Qz�y�廻s��w53�a�`��� ӫJ��B���M��wGқs�ù|�D꯫�.��TQ�jm��!��~�Ҁ��ΐ>ou̶y�>�'�+��X��:��7��A���-`�?ܼ}qv/)�]4= ��jҏ ^�vblLOD�^�މ��{�ӏ�b�f�]�ʽh��S�(�qfr*I"������������[������͝tu���mqv[z�Y�g�o������hE|�8�u�����.Q��??��^_�J/no�N��go/���}�۳���.��_Hwo./�ο���DN V�/��[�j�-<��h�1��e�F$�A��0�ԏBoh')�N^H?��l�L���L%�J,�Py�}Jl3_Âp{~�.�O��êƋ,�&E=�FM�N������ (�T��>�9����=-�KuBM�����$�>$2̵�;Kp��YJ!ͫ����B�
3�V,�Kf_e�ý瞻�>��
;Ǌz,��>)Tx4F�t�3L��ab'���
c"�q�MzY��h�CQ��Y�ObLD�W�V�m�'U��u�4k�	�����^W����M��i�	uj<�~VR�y�#
V�df!�� %��������@~*c"Ռ���H)ƴ��P�c��C��m/G�/��g!���0&�:U��T��k"_KԪh��0&
?͕����mqP�z9~X��1&��'u\�M��:6���c"�B��>��"/�a���;�1A��R)��z��,��Pa�I��L������[�[���Θ���ĺ黴��L��0m�/2&,_k;�j]%Z�3���*��	    ��(7�X�L��Kt�*T�Or�IikSJ�!�ƶ	��pI���
歛�g ��S9/"v�A{�W˒vh����4�ƶ=�������Ѻ�:<��՘j7u�ܣo(8�swYgC�6hДΊ���ѹV_LX�=:tC(�M@�2�co��+쎌UWSA�q��������9CZ<��F,7ɰ����մ�#t��$W&O�`j^�~�H��Z���=&Fꥆn��>�0�����84�̣�c��ߏ�I�)-|�n����Y��k�F�S�!6��*���VC�$���@C�Sc��K��Tmjy˝�Y��j�L�Qem�[3�g�ú���Z��9ƞ\���r��H��:�s�Ϛ���(�d�+�_z���:6�w��_WvY���	/%jwx��_HT^BT��uܓ�����IT=�f��#I��D����?>��8Rҝ�|3��Ƞ,�l��\�rA?k��6of�=|5' ̐\%�Z�0��Gx�����Յ{$��m*�B#�?���!UT)�hΈ�AXUs~�\����g��"���T�{�P��q�75c��n���5�g�x@�ă�7=���m/\~6,sʴQڌ�٘��G�T#������g	^x�1�;��c��o��6�7/��]T@�;�ܑ�zW!���{Pc����kȁ
����g��֨�����Tz��c3:0�t,���Ă�5� h9��ljv�c��󫦚d��c��BX�niG3��>w[
3r~
�*|��`$��Y@6φ=MA�O<��H,j�c�ͥ%?�8Y
��=����ۂYL�Z�̵^ģ)�Ƒ��+p0�Q��l�ͅ�I�׌�̑����>�%-* V�CϾ{ɻ��{�M$�rY#t������r�@�W���=3Z>9;��T��i�z�<���l��݈�6�0y/Ac��M�p�Y�3J��ɺ�͖l��t3W\yy�H~_�b�M]tP*�9w���n�@=㸋��輣��l|���o�<Z�k��h�mUf+8��̄�0�]^����� 6�p���y]X[i�vy��Y��P���=�����Y̩7緋�p�)��,�
���$&Pܴ���?��W��c����4m�qV����Ͷ5�����ï���+�z��ȭ�0�� �8[G�v�n7U\E�V1�㯂XTc+���cS�&�n-YR_�XӼ���x�O�'/��.��c�@��b=�V���V�yjb�'�ەY
{���Y����1�d�׫�X�>�b�G�>��Y_�����_Gg�f��J��%�\ 㛵m*65V7��M���m`�����x �Ż'�u�=y6㠑ۍ��K���K(����çm���ᇧ����6��\9��E���k���LO�6�f��B���r��Q��ǷQ;�� ��S�H�ƈ�<�!<+���-�0������;bi����!��ўcۘ
��3��*^�D��:אl���R�0T�c�4+|~�;�K�Ŗ��Wf��+�$�, �d]w������� E���,)~�5��
0�d�f-�E[��!� �E���\��$�=Ba{�zµ�Il�ǥ�ٛ�p��j#���Oڤx��2���-Q'�XK���0[#��(!E	�'�G7�G"J��wI8����}u!e��󎸡el�j��.(^NJ�����me3�Z�(�]
/�s���(��h����Ee`
�F�m�\;�6-����i9+H�?�g(j��Wj��E0�����/r|�s6:��x��)w"��Q�p 4� �șpHXt�q���c\�|XJ���I6��A�zz-�:��R% 2�������!��F��#��f0V�|�.".��6�qg6�}"� 1s���nY��e[{��zK������f[I(�3~T(��I�z�N��O<���?!��������|$�l���ʲq�8'��V6���:����Бx�b�B80�SP��;�ֆ{fH��}�+&p"��;n�	�6|��\�c�(��\�+䲵���d�1��i��p��&�� ��Jw6O>4_��=S,��%Y��,�Q���O�~�h��_���ŵd�� ��({\1�;aG�����%�1�ɇ6ޒnh+ap$-��|�:��Q�-��8U�ΎjK5qҘ���:�3�\S%@~j=��(I�NDs[c�����yV�]�w���S�M�0v֫�(�qP&j�-�*/��a�9ֽi��m����6))Z����eO�ҍ(��e�b���S1v�w���j=�uUy�T��	���ҵ����z�h��?L�
�اd"�2ZuL��<��ϩT��Ɓg�i�Ȏ��%�j�pƃ0�!����P�*e��dp=K�Ʈ�uԓ�WlǤb)#EV��O�㮫�O��K�t��mr%��>��3�w�-�`�a��MH��1���Cs�>�}�5�l�U�E�ݎ?�c#r��ƞ�f�E������cY�c��Xm+äO�r��觊[�e�$qRN$�E���b���~dgQm+���n�ʡW���l
ن���bN(s�Q7�%[�'���KR�(2��*U�#��Q������V��)\=�c��r�+:���C���e�bF7�uV(�ܟ��2Mڒ9�n*+�����G� ����tߦI�6�J���Ƕ�#stԳ��XD&u"�E+���~9�pFPh�V�4�����#�ɘ*V�(�c�*IYi�J�����6�*C���k�6�+���=��j�z�9ZW���Ҳ����?�̡��~����#�ҡ֦�p�nO��qqأ���(�]�rГ��W$	V#�c2a`9y;ڕ�eZ��4��}��6������F~�kzӇ�q��d9��vY�c�En�}��@6}R�D�R��
���t֢�����^Ǐ�>H�2ɓ�c뾲O��>h�5�&kj}ͪ,BW�aMAE���h�$+v�)���5��Q�Dszy�2���lpW&Ab>�(B���&;v�V/���I�5�S�5�fb{*5d�]yP+�J�9���T��ԁ��J��r�U9n/��y^��>�0�UetnB�?W�yJ��<�?�y�7�����w!�W�a���o�����������ҫ�[_r}�ӽ���ٻ��[��vu������=u������k�!��=�~����b�c��q����?%M�\���w��7�(��/n��/o�y��4�вl{+�����/�z̳��E}��s�r?�4L�Ԗ쥛,�lb��$�>��׻�8sBn���"�iX���x�A�!�#�s�-O�Y*�� Wcb{�c��� ��%�:J܌P��M+ ��ϯ��QZ�P
`�"7099���|���GWd�ݤ�vyJ�m��ɦ��#҂>��̘�i������] ��2�Gry�G8婎)�X�v���E~���Q��uS������u{������_����� �$�qr����{Eh#��I~_A����x
Jo�9�:4������h�s��8�+{>��2.)+J�<��Ď�n6�u����n*Á�sYrVʦ������[���qK�M�c%��*[;و����gC�@w����cHs�-d�g��E��p���O)�M���X�fN.�P��ڰ�oď�]7����XO���#��=g6[�9_a�v�rk` Oc���D����7��WW�yo>\�3�||�Nzqvuq']�}qs�3|}���������Q��f��������_˿B�����"g3��5��)��ك|���w��O<���}�f��Y��hm�gf(Z'=����oo��^	��X��R�&�3Y`�oank�K
��i"L� :���|�6�����I�u� �����@I˘o<�ĝ[�����m2N0�svf�%�C��� ��	��3 �͞�WX$�#"2Dl�$�q���O����r�Ȧ�&7�M`���l��D��e��',����n~�~�y�u���~����b<�$���8Ip~��O�뜜c�bg�¬�+;DV#������z5�D"��u0Bʛ�V��CP��;�    JҜ]$$G۬�{�5,-t���$ =��\�<gWyCR���*����N�E����"(EҔ��H�� ��~��T��k��߃@f�to�aM݈��$���b�DĬd��r���6_������!���0:N�w0��X�Y��t��E��
����W�&��rŧ�+^|&�9�V�p�0���hb�|ON��x�W��=L~=�'�P�w��=3"��&w�_f��d��kyc������W��o���S�������C�3� fݔٓ|�i�tbM�S�P<��H0�9b�Da1�q��!�v��̕������v2 5����9��W�J	�35Q������\Ŗ��lA�Eb�n���<��b�����l	�_h������ıh$�(�*��Sϙ���fl[�C3��Ȋt�;,�t��8u��?������fȿ�,���iK����z��FD�F�W��j|cqF���7����: 8��Y/���|�(]�>��X�%ՐF��hq�z�D�#�`Ͳ*3cT6�ق�;��gb��)�ۡ�>�3�d���WlA�F�'������ckub�Y�E�\y�8t�
�F�jо�e������Lv�gOb�t㠓����oi�H{�^c�TeZ�nO$����hlK�T�hH�D��6	v���4=k]�B+'����C�A#���*�ʢ��4"~߲y��vl����,�Z�]5T�mumDƦi�I�����nM�$�ܩF�N�aѴ:�
e����_��l�Y�� � �&�^�t��Y��D�lnV6]�a��ݺ5*QƇ�h���^�hD��!�5흄~�E%cWɓ��V�[,���LY9�E㪨
'ڳ�j�'~N4?�2�&pPd�J9"���ܰ��E�dO`�d�#v$R��R�k���=��ƭZ[J#�H�咐�OB�h�_�B�}�u7� �O�����v���Q��������Q���������k*�O��0�{b�T�uE�%� �>
�<�c�@�*U�E5�]��نZvA)�d��Rz��t��MU�dJ]ծ�{~�� �=YB�]1��i��+E�a��sa��*;�G�F��՚R�c�E��X=d>�Cӡ�ͰG\�L6���R�b3�2?f��J��7RCm�6�il�O\��*�3K���KUw���N���O\	�Om���C�P�O\�H\�u�6 rյ����-yX��8����&,��u�WJ�;R��>qE�S�CE]��}\z��.��D#�!��˽�I���v�@��r�,�섦iVu8�I��y��8.�x��!�⍍WQ�]#�hC�v8��J�##��sqԔ��+��:�>�C0V�m��h���p�E*�p�V�z�n�J����)��͏��Tf�N�%�������5���5hj�5���r�E[Y�W�X+�������E��?3毆l��/��T:K7���"I7���A�Az�C���	eE�f�xg��j'@�ֆC �����dT�fm^"@z0�@<�g���Ƿ���ʸh��)�SP$�Z6CI3rt�cR���V����݀~�TMc���;)b/��6��v	`Z@H���}@�|� /��gY.����A�w"�M��q�F�e���9�����l��M��9���%6�c��b��s ܎.	���J�0�"���H�q=�!�m1�!(��:��ĺr��Z�����_-��Z�~�C���y�qf�t�������d!Tf��y9��$� aژ�	/k�Sp��ĿYҹθ �=�o�|�9:������ĳ���]����/6[q�Ts>�O؇�r!0�D�&����GO`E��NyPbCj���ʧ��B��C�9Ts=�q1W���{�����Fj�sK���#�5d~��s���XU�����M᎛ ������m�ɞ�	�!�<����<��Cw��)�q���/}�t��t]D��9�<x!f� �C=TV���f�n	�[�0{;���`&�A���Ğ�M�"���.@��� -���`(�o�
��frw���2�83��1K���h�̳
�4Y0hw�l��_�B���������R�	�?9��&�Xޑ�hf-�,[�@)<�:�Op�?~"�c��d�3k�H6�/�$�>�� �nߑ��1*E�,@e��d���`.�,*�D���.s.(3���D�I"�+��8*$x�"䱘`�9�R������9p�}�s<��sE��51f�� 5v�
�R؊�����������
�"��k�l0�_m7Kz��Ez�Hza��^�3��,�l���9:��Z�)��&�3r�\�G�s�˰O<�% R>E���2[�f�9U48.љYs�/0!0!����3��p��	)`J���P��R���Y5b�拂ka��a�K� 	�;��l����B��^�P�X�w ߅��8X��d!�h�cͻ��M�O֗W�!�!�-+���\��o	�� m.B
�H�]*g�{� .��ź���������H�> �g1��B�&A
+�-�b�����ғ�yjc��H|+5c���"��-��y���Y{vڌ���e���V��.e&�U�� ^�en;7�[���Vֲi笪�0�8$��ª,bf��������^7���ʲ�9-|���s$�?�Z���^co�0�?�t 銙@�����أ��mH�^5�7�*o�[E>�OGֵ�vP���OG�>��e����c|�H��py~y��(��;����c�3�O�B8�ob9�?5�8Ė@	���Km�/�qJP��G�e�����vN����?eG���%K��9y����W��6�УO�ol>�"��쳥H�f�=�#"�\-�K���Da�l�^�����ɢ�$8|'&���uz+�:n������D���|s��L�xp�
��I�*�g��)VÙ��/��f���ZBK�1�D�{:�Q���*���n!����$�m���n�\<�p�"�ɼ���#t�¼C&�d��H�q�5��?W��ePP%��q!#�Q�
�r��J�����5~��_����;�4^4_���F���p�FN�P�e���S�|(]�R3όF�e93�6&�
u��
7�jk�kH�k��%��D�pG9�Yr��N�z�U�L�L�;i,jc����LJ��$��5/��QwS繢Z��J���!�\�v��>u��i�M��R',մ��UUƎ��� �4��Nؤ��6�T�M�ّ`����B�Pԩ'E�*s2H<�6��s$Jk+ޔ�޻�^V��غ9Q'?��,�0���ƴ�����@sK���Qj&�`u^z(u"bs{H�Lw݉L�3�tR�@�
�t4�()�&(�Ң��y���	�ҩ/c[(8�����}�:A0����b�y19j��e�UO �
u�ŢG��b�
�j�:��r�J�t�&#U@���Y��.���2�A��P+Ԯ+��s|����/�SV�����!+y5dN$yb9t�f�j�D�j���cNx��8O
����^?���/3'�<{�e5�
�9m��r�:�N���_�ha�I�<Q*�+@��	7l6��w�U]�ݨ���v�b%���#R"͏��13�ԉGw���Jh����N�ud�q'�)	;��/�f0���9�+h�}X�4z�q��0�ȍ���&�G�0M�k;%c��6���̕h�Wd-�NtrU�vCc6  Q�i�S'L�zI$�f�E;5=�Sl�vE��`ꄓuJV&�[����69�>u"�������*%�"@�dY��B�Y�N<f�ҴL4h��"�̶�R���VG�{y�s�[�S߱��mG}�wԵ�<�ɡu]fU�h�'�6u�i�39����
��e�Ty������LkZ����j�9�0Ma�����؆�FC��[/T}����,�'09��,BD�~7D�gy���>����nL��s{"aU�A����8�G39<է�T�luKA�dPƸYcrh�R�P�g^�6-&�0m�w&��19�IO.��'��	=���W�H�8��Y5��(���J���    ��)�<3!�y�l�Ywd��N�.}]*���aM�:�i@�Ð;����_"mr�|�3�K�6ݹso�������O�q���������{�9=������M���[_6�����3c�����e���"O��x!d_\΅�wWRA�۹��i���TU�ixL;�����^���q����������67RR�Z��5���q?������½T�l���Z@��м@M�_qQ�(� � B���h˕ܛ�����i` �*�Ą�FaU�ߤD��K�-AG2H��ǞYS"�F�[����G�6�?B�l� ���:�J�6ߩa�j|$xV���R��<.^��{<�� �r�MG"s���s���c�x^��AwC'}�D7>�?����e:y0��3ş8]@:�D#\��K�q�5��'�h(���
��k�u0;�yr�؅�J'�ڰ�Ik�E)��G�r�ɱ<��~|5:+�C¦4���B7в#�i'��b�,���޺(��(�E�,{�l��}1w��)W���K���RTd��bh��:zp�
V],:	��k�^Ycq�I?��^�Kg�@A	���ݼ<�����L_���I.f8
�.]�֦�� �C��c��	�6���@�qA�a���=f6\�(��-Aݚߊ>�������~��#���������M�u]�<�|��bd>L3!�5�-�aw���yO�8m�G��۽��Ľ�}�����������6P�g?3{��(_]]~��~}$]�<��7�ׯ.^�_��������,�8�nW9�e��#8هK�N�����g���oj�D�H�ě'���b�n��rP�O=V�-�HALT���4�y�G�O�L�..f�E9 a��e:Z�.�5(�[��T�	��f�p� t��x�)�x�(1�0bG
:t4��϶��� �-ۖ�;$�|�7���:�l�8H�FXɆ���M�3�69:�dn�@QX���,����D8u������ _���o�Ko�>\H�7���߻��.?��~]��"�H۠�	��	Aآ0���Y�H!�
\��g��v�[(<,���&ۻ\J��×#���`e�ߦ� �|H��՝H��f����^��^�ɬS�Bl�u��yɐ��ʹ��\���A�5�Gf��2~q�K�Cfc�8��σ]?�A�X��w"��� ���E`exA������+���\zq!���8�g�+���y/]�/$]4{\p�
WT�����]�l�B~k�
q���`�h��p*��(7g)���l�G{����e��'�F�����SdYy�����?i�Uz�&�B\!ಇn�&��!U�j&��� u�/�W������r5��4�ׁ�7��9�:iә������?�b@�n�!�6�4n�'���)�1?�K�&���%nq<9KQ��f�����M9�������#��Y�� ��L�W�~��������;�����޽�N�]K7�¹�q�%6�D!o#gV0�|��b���f��_[���C-Y7����]j��8��H-�PG������F�ɠV�|Ѣ�pu�6;\��Yj�-9'�����31�M����K������/|	׻���������p��:u}>b���K�'P�cDFv�i��=H�ƹ:�����j>�м����]ʔ�o��/��go�����ڎ�U�'_��9 qk�"?`>�.ıw�KX#i'�����&�j~/}ē�/7L)�R�	�7��3��(�WuI��~Ë�I��C�:[�ŧ��GG{����V���y8q�#ݝ��]ќ>˟#X���g������Ħ#i'����Т�\D�vK���h-�Bnz��7��v�d(��'�>�� ��O��J�B	h�l���|-w K�2<3a�����?�n��fG�t����a�Y������˻->���3đ)��*P��XQ�e��9��:(��f��gS'wc��+�$ĚR!��MGQ[��ƅ�=��T٣��*�:1t=qs��(I�]գ��8T��F�`i�T;��4J1c'I�>�<)2�nkU]�$u���K����m��(��O䩔�@�3כ��sê㲌����1Q|��'��2b���(i��;��Tyy���"_�>���P����UOө�+���2�r�6w�'O�$�V��$�
�uU3CY���(It�3�w��m�]��ɲ0��C)IC�A�aǖ���v����$����'}��mZ(�]�lך���$4��T�F�lb�ڗ)Ii�����S5��*j)��)��	��AՂ�̆�ձcj�4�A�GIR�@M��+��*ó&��Ge잝�T�i��dˍwq�F��Q���������d�����!x~1���*'�`�iД��z[�(I�Q�9Yb���%;����ɡ���ǩpH��ɻ�V+�ܣ$M��x��dt�+~椆�U+4 �����{~�{(�,4V��P��I2IUչ��6�yt��9T7W��r�����Ȍ��Ȓ�m����=N[TI;XV�ֱ��Y�iD�
��@NNp2��7�qA�I�
j�{���H�|rG;��SJ��������$�D�ٻv8Mhnf���>'IV5k���n���nhT���i%��CN�c�FU�ޘd�rs%liKM+�)I�����bO��Ea�ڲ�UƊ����$�
�N�rt�$�;� y�OI"3�HWú�b�>iS�M+���)Ic�襖X~(Wm/[rz�>%��z{�L5�T~V���z���(Ij��j�'��I���5f�%�ti���m� V�`��簥#Ξ@I�����䔱��z�Q�ܧ$uF^y�,+~��Lr{�V�ˣ)IAe�I�'E�}��I_%k���p˔��ӵ�M�K�uq�uf�i+��Op>�R�R*��_#s� >��O?�^������p�����$ZV�����/Ĉ�A������|��}l|�'��U5�V6W�/^}����	\
�2������iT4�\\����M��0u�Y�^<�u���SD��3�c4�Y��E�)A��]�BK"���	����珿#�I|�5���'���M�V�\����%|���"�������j�B1)if�ɣ.����6dD�c������b ��! �T���~+!!P1^��?M?;[�o?? ߉���Gs3�vڹ�]�7�n���֗<Lp��6i�Zˬ\��5^�0)r�،͙O��?�xy)Q������|���[f����Kd?M��w;ZԺ]��ȼB���^��^��҅@U�7����f���s�A>lIb�y�������E�0pe���ˌf� y�ӱ���B2D}�w�F���w� I��6�I�қsɲ�ԣ%�W���o���]���k�p��Z��[����x���j� �"E�ҏ��F8��H:c��&�J�[(&\s ��Kg���R���yΝ���������%�����x����w�ٻwW�w'���ǒ.�I�Sgk�lV�Ev$]5'h\zX��glxjP�yQМ��gop=�����EB�(h�Gl�y�/��o_�|{��;�s�E���y�/��8���w��==��.��l̪�67�{N���M����J�"؋ iU�AC������o~��8}����^�yź��c:�;��⿽���8�Ի����.�Bp��%���Ɨ��Ϯ_^��=ϫ��^^�_�^_ܳR��/xb���+�;o�_��N���8{���Guywq+������-$������^����.���㬢�w�?��(�!J��'���x}usv>ry}wvu�sc»��8��Y+��������V�]}P�ZG i����{V��D�-h:{�^��_�����J�{�Ῐ�.��//��/�xv%R��g�[���7��w���o��Y�ή.����޽�}����������{�{�����	��;^�M[ٸ�C�/�X+�^ދ��\_@]��g��k�ңw���������ݫ�۳W3Yw���E������C�38Q��g���������0�ޱ�۳����nf���B T  �#;a����ԋ;� ��*r~qvyu���޼�6�-�C>��gy��
�gF���s��A���Ym+b�?{���KfF�>Kag��`Tl���onY���|Ɇ�����s6f��=�.���VB��no�X�:^ܲ:_K��=��n�U��J���k�)����ps�L
?��*/�A���a�X�a����2�{�t���Y4�dwb���3v�\c�x�LM��^gފn��؊�<��9=pK����fqFE�,���c��E��/�����--Wg�K���},ȧ_��f>��%#�Ǆ�ߨ�7�8m��W�o^;������C�v���+��� ���)���9o�H��4�s���qSp�\�)���|}��%�"�F��%(���Z0��J>��ىws ���J��:�ǔ��Q� �X��/rq��ڼ�	�R!�'[�7�&�^�����'�9$��5 �\fE?V�c�x�̊叹�w����w�����dV�4��ؑ��2z��W�@N��i�C���Ho�c�U��d�����ؕ^��*Ld�&����\#?�Ӡ�voJ�9Hœg��[����1����1)��Y5��4���TNC5���m#v�+L4��S2+�_}��r�gil:����+��N��'��L�l��rm�j>�ih�v��}�xn�[��2����8J�[C��̆W�{��,�s�l��U�zHuO�2��^z��4L��{�2qٰIew������M<9U[�N�bguTO��4LIۨ����[���y�9��%�[�6;+������ɬ�ɵ�7jN8VU��]t/�r"Ӊȶ9��*}�YTqW����c���4�8�G�Q��$��)���R�	�{�J�C�V�,�2���yE������<d86F�G4��
��	-J�&7T�FF��+	G�����^��*-�rSΕ=A�ui��WGp��9F�䩮KWR��#p�*c����a��WvV�{<��6�鄨��V�N��*\1�y��E�X�^��@�޸�#Hq��ШlvL��D���:W����J(��*ܥ��M�Zo�GP{]IjZGC.92z#(�:�VH9k����%qX'���SZFg)�DSk��j;oSeJ�i����%�^kF��.@Ә�:���}"[q�w��z�����F��F͊��:��1����X�^R��U�ʛ�T��*�ҧ�[&�ԙ�n���M%Z��\ElQeP%j⮲�=Uv�\V�6�l�Co�!#+�l�+~�R����4G���ʳr��f�|�8�ʮ+�	V�"�1"��'�7���v}�R�C}1�Q�;���3�6�$�N�]gl��1 �r���kQ����f����C�fΏ�d
%�u�EMW��ʮ;V�����zo
rb����ո��90MW:�Q�e�a�iUV�ͮ?&�`�u���VE��(O:US���D]�����kLCGl=h����s�Q��>rST�9��(p��<(���$��F+2/ă���MC}���d�ٶ�xc�Mvl�E�h��J
>�P�,�H*7WMT5�� ��SJQY���VQ`�
��ʺ��cY�na��T��<�DqTyPd{�]�N+�Dc��F��:��MWX�&TPI��Al�P:T��13h����~`9�b��k�������w.�mQ^�OAx�l"�"E]ܢ��؁��vcN��H����ȕ�����$�sf(�
%K����K��3$���?�O�;+�Pj=�?h�l.ƥ�$4w)cbM���2ˤE���h�G@f��%����Q�s׎�^S@f�ɧ�$KnV$�rX�ڞm���}�J3��PO\w���6�i��"��%险�JC�� ����1q��
�r�9(�9�5��$��8��B�S��!R�r�=jO)RU� 3͉sZ��6l��k���a0�Gn���ط̾�v�q���[q�,(��/RC8����bYJ<�㾴pbK��ɂ���{+�Yߗ|C���̵E(�r2��zؽ�0g�P�,szh��SJvI0��4��EmҔ�ޫ�~��kG⡭�K������]�^J�8�V�`\�sqN����{	�j9C_�������]p}C����]l��w<��v��yІS�m}�:�Ⱦ���B�3��4�m i��z+B5Y����ɒ��8���E�n�N[`��Mac�V��������ۇrp?��L�O��p��l{7�@*�_TH+rԬ��0%,4��@�qR�Uīr}x�T ��t��H�(AX
I���[�So���&;>K�������$�Lm���Se�(��n*H�z�ѝ^�X��|C��^Ԝ��\��{PH�:�ի����8k �a�6+^{#����ê�@()�I{ ������4~]�T�����x)tG%���? ]��$a���n&�;wם�˫z�4���UzYh��)"�tMS���.�.��l��� �A~��*�;!��}��{٥�������L����^�1z��(?ճ�F��	"�p��x�ʁ�/�W@<��ڄ�Cc5a�!g����C�yz���� 
�k��mtW�N��)��0K�H7�K3<���_}�I��t���
�ʃW�	<�����X�LM�8��e��N�����"��{y������w���������t��n��U� J��Y�  �wk�υ���[��̏M`�`	��n֗���=��,�x�U�B�圙��,��^��i� h��7.&Nt����D����|Ԫ�����R+�hS�OF�J=F�JPk��/��J���xG;�،܇:o�2XyP��e�{Uz{qs[_s/2�!@3ĸcKr���3Sָ*v������0�4���b��*0[�R�B����/��&�W}�����n�9��y�
8Bƚ(1ĩ�K��tfRZw�E],��y.�EMXD����}���.D��^�<�<��ީ�!�w[�?���ˉ��s��i��_��kg�J\}@v���GQ�����ڽ}aj%�X��Rѱ.>u��P�Ӌˢ7����2�q,W�K\�$�	��p��va��E����*����Sgq�=�XϠ����IQ�K�a��=_���bN�t������l��       _   c   x����E1�b������z��ױd$���B�X�l-Ns��ç�|�����ȅK�x�/y�-|�����#C�J�RJ=�����T��%Ke~�?�\�      `   T  x�-���� �P�>,H�^��:V������/�T�^M��Z]~V{��u�����.��?����z\����o���l��O�շWo���7�F���x�i\���A?��z��ٮ�����@��\C���Y�ʭB�3\��/5�T,K�R��8�\�����*aA�����_l��ˊeq�"�"�"\#=�KЕ�aJG&�Wb����,Z�_�ΐQTfQFeu�9�Ce�>F�ۋ�'w#T8���J�J��m��o�+a+a+a���ENC�."70's%s��<13e��!(C01/��L�8ya�,�P�
�%q*N6�{��2x��O��{�xm      b   O  x�-�K��0��a�P��.��9����zc{l�������<��Y��9�7��V�f���91N��D����4�l�M� ���l�l�l�l�l�a&rF�g"���v!��>;��͕͕͕͕͕�uU����.D�/fd��̬����
Y�B4B��Ō��^?`��(o�7�o��������O��?�`q��������|�lp���A��I���`�L����*��>&EM�x�lp���A�w�Q9�� }6����&}���W%�!q~�,����.]֥�T�jT�n��tC]��w��ߟ���7|�$�VqZ�q�UXqbőU�,�쵪^լ�U{��w��ww�]w��uw�]�&�&�1�D`0�&X`�S_eUW�ȧi?DADC�68�'V���	�������U�R�-�(�#��n=�z��p+a*a*a*a*a*a*a*a*�މ�}��í�[����|��II�k��d/�ޔ�*{W�$nI�ݔ�Uْ�b�b�N�N�N�N�N��p���m��Ӄ��,����.��Ut�C��0����Q%�[��~��?M�      c   �   x���Mn�0���)r��y���UQ���]f���
�1���d����5�s���Ƙ
k����uk�3�	�/rp�1�"���a�Pd�"K��Ȣ։�#�j$\8l&H�խHQGou��p��X�U��ڊ4���-s�&��<M����!{��!��N����z:�?.����9���q+<��h)���J�K;�K�����q!��#����s��j�x���\-U�Z} h%5$�fQ"����Z"z ���      e   b   x���A�̪��s���X�<���)����{jxi�Vi{��:>�����i"�M�0�B1��,���"GԵ^�ӊ����]��oo�2��l�N�<      f   �  x�-�ɕ�8�U��+��/�;��I�)�'����Ƭ�j��ƭ�j� 3Hr�� ;H򃂠"�,�,�,�,�,�$9?I$ �$����|0@5�bP1�w|�ƭQd�Az�W�H��3 *� $�bR1����j[V5Y�%��c}��ZĢ�b^��,-���	6�M�Ʒ�۰���E�a�l�f�6K�o��!ެeþa߰o�7L�����r��ٟڢS�����Y���a��phphphp�-���ﭙ_��e��Gu����y��]�{�����6@�!p�$���c��5.��Ԝ�������1�G��c}�샵J����Rq�U��Z�|k�%��#�S�L�4Z� ͙�Ns��[�����&F������\��	[Np�z��z��l�ex2>�O�3�-��9{��+��z�
�e�Wx��%Q���<��N���m���W~�bpP���zx<�)���>�z^���&�d�ʞ�h*2S�餧���N':ݶ�Qx���gV��洹m����6E�"P� R�۪,�fL��Q�1ʣ[>�ս)mf���/v�TǍDo��(���zjE(�F�"A���(���d`6�gS�]��צVv>�p�%H_u4�'���������I��z�F�K���������U�|BQ��^f�����ߌ.�T��)s�����>��O�\ ��46�f�jh&��y*��3���
TP���:��P�C��
�*P�@����S����=W|������T2"�|�J?��W������
R*H��N��Aq*<^_ٮ9Ϝ�� *�p֜<��?�����]J�'��Tx
�����5O�c�Ym*6X�;�<�3�ʰ��`_���eH�*�����pe&��b�%��@l��:ԅ��(X�CM�M�-�¥��A�0L
ӴL��[����D��?��\��҉�i��3,�[�J��JKy}1�3���������v[      g     x�UP�n�@<�~E~��	�#�B_�*�=��7�H6h�_�� *zό=�5lQI[*���o٫�t$�-�߶BV���Xɏp�,J��^�Ac���K5��]�)�aF��xo��r�/|l�;���bW�(�ᩣ*��!v�r餱T�%�>�����5$�K�@M�)�Y���n�ԉMf5;ٓғ�]�z)�RF���h����b�p�ɰ8sC�}U��K�Vb/�1֎�����^S�5��E,�6M�W�5�'�cgj�����~�+�~?3��      i     x�m��r�0�׹O�%�4v~K�.	I�)M�:�,�ȲB��R����Aw�`�{��<�%<Q�����������`2��]���D����>��/��E�hÌ�1VMqA��"�y��v��SM���.ԁ!�+�2���;!ת��޲��х{A�Jc�
'Ko�݃�l�<`q-;�)��<���EX[y;z�čK����9�zy�����||��6�=������g��.�@c��Ԙ�r��
�2�_A�4�M��ZUz�ݡא�2c=�<#Xf!^y;o��� ��~n�dPG��=Ն,9�h(���gPY�qN&���h�ytw�F"�@�t�W�7��l)�9@J�y�_S�w��un�޸Jys����i��tm+sDn�Y'F��Dk��� *�&p	_p����J���A͈)�g�FR8���p�-7wH^�b�]Ü�Unv����s贠��3���j�H̳�ч�Y(F�bę��|�*M����J��Һ'��ua�n��JQn��f�c��|� �/ER�:      k      x������ � �      m   U   x����  �7Na�(*��D?&�_?���wE� ej�i�dJ���}�گ_�n"�9�V���fޘ�ذ>�u��B�B-\      o   �  x�M�KS�8�׭_���r+���0u��j�f��"� [)I�~�ف�*��G��ӟ���ߤa	���XJW2��֞�Q,��`�>y�לV�+h�a%=�kg����-��m�jz��_��㉉9=I|ip��I�ɄV��p9���v�ɠg&2��Μ��i��L��ԝT�A�)&��~���(�ͮ�W-]�� x&j��n0r�+��%M8�D�Z����<KZ�C���������eWJ+�A�q6ȃ��,���t`I�üGl���hIA�_ֵ�/KJ���+�}�wFz�z�)�Դ��������Kc��r9�x�|KS�K[�u,����%9m7�,-h�~G%=�Tϟ�3-K+�+�鱻�����n�0�.�èKؙ@�oX��O<���ȲX��|��A.k��#h���翣΢ݰ��8��p���H�_�!��Y:*�ִ�~�E�9���V,��M8�KO6�)Oik���ԯX�ѝu�9�=[i�_��ʝ����T����ⰼ����s���TQx*�q�Q�(n��@��[A���=+��B� �.�x�WX�ѕ�C�/�aEN�N��wv�[��ye�����;+J��g&�PT����$+jZx}ԳrN�0�W�JHq<�c��d��ʔ�kV�Ӱ��iշKs�3�]�W-�K�,�|��%��[dTV�^/��5]ƨ��1��N�	���_��cg�o�q)魄q+D�{���<�@�A�6�W� N���Q�K�,P��觵��Au��UI�	W�0���UUG�e`�<�O�b���B�X�N�,רN��<�d��P�NB��<ܨ�a�PΟ��5���u u�n$Y]ѝ�$�kT��.R��]w}��R3�yB��$�#0�gQ��
�4� sXk�?s��`�-~Jz�x �b7�=�)�5=������]6���vPws<{��v�w��\4����}<u�s6��>Ll���l��c�0��>Ǧ �ݧ��S��Jb��p��-�]�4~I��q2��m[�GW�HU�D���f>"���g��6N�H��;�U�� M��#���t�����A�h��k���`�s�ݝp3F�4��l/�T���F�.�6�j@�Z���}����(���������M��N~��x�>�ry,ߛ�Ȍ��>�V1�8�������ac      q   5  x����n�@���S .z���z����4��c0���.��{���T)�iV����FC��b�kjj}�����!�n�(��h�o7��K!�<P�»g��`�!����X+9��МIL\n1e!SXIƈ�!������&g�!i	�b��YZl�eԵ��E����p�<CFi(�dP18ŜXD�Xot�=�޲i�:��۶t�-�vZ�_��o�>�9_�4ξ�z���+��؉FT>��`)qc�_����v����U�6��W*�^�m��W�G�):��O�hϡg㥼R�4'���YR'��H]$$Y��wc8Q.��<}w�*.��x|X�s1��+�<,��k�����R;�d���m;YM�ɬ��m����c��� N烽��ٰŃ��7�W8KǩX��x�^�R�sY�Ձ�������D�Y�@�܇�I�� �������^�E�Y�'�6z�qe�B��CC#`
{?��1�]$�`��з�CrB0�C� ��u�����G��>���#�� :ϝ�������<      r   _   x�����@����؋��K��������n[뚥�����іQY+��}tq�c��d�;t��h�|k�<�ހ9&�������O� К�     