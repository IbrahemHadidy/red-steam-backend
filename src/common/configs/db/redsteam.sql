PGDMP  1                    }            redsteam    16.2    16.2 z    u           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    "releaseDate" timestamp without time zone DEFAULT '2025-04-05 22:58:42.202'::timestamp without time zone NOT NULL,
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
    date timestamp without time zone DEFAULT '2025-04-05 22:58:42.2'::timestamp without time zone NOT NULL,
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
    "createdAt" timestamp without time zone DEFAULT '2025-04-05 22:58:42.201'::timestamp without time zone NOT NULL,
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
    public          postgres    false    222    �      b          0    285718    games_languages 
   TABLE DATA           O   COPY public.games_languages ("gamesGameId", "languagesLanguageId") FROM stdin;
    public          postgres    false    224   ��      c          0    285721    games_pricing 
   TABLE DATA           �   COPY public.games_pricing (pricing_id, free, discount, "discountStartDate", "discountEndDate", "offerType", "basePrice", "discountPrice", price, "discountPercentage") FROM stdin;
    public          postgres    false    225   ��      e          0    285731    games_publishers 
   TABLE DATA           R   COPY public.games_publishers ("gamesGameId", "publishersPublisherId") FROM stdin;
    public          postgres    false    227   ��      f          0    285734 
   games_tags 
   TABLE DATA           @   COPY public.games_tags ("gamesGameId", "tagsTagId") FROM stdin;
    public          postgres    false    228   p�      g          0    285737 	   languages 
   TABLE DATA           6   COPY public.languages (language_id, name) FROM stdin;
    public          postgres    false    229   Y�      i          0    285743 
   publishers 
   TABLE DATA           A   COPY public.publishers (name, website, publisher_id) FROM stdin;
    public          postgres    false    231   ��      k          0    285749    query-result-cache 
   TABLE DATA           _   COPY public."query-result-cache" (id, identifier, "time", duration, query, result) FROM stdin;
    public          postgres    false    233   �       m          0    285755    reviews 
   TABLE DATA           W   COPY public.reviews (review_id, positive, date, content, user_id, game_id) FROM stdin;
    public          postgres    false    235   �       o          0    285762    tags 
   TABLE DATA           ,   COPY public.tags (tag_id, name) FROM stdin;
    public          postgres    false    237   $      q          0    285768    users 
   TABLE DATA             COPY public.users (user_id, email, username, password, country, "phoneNumber", "profilePicture", "verificationToken", "isVerified", "phoneVerificationCode", "isPhoneVerified", "passwordResetToken", "isAdmin", "isActive", "isLoggedIn", "createdAt", wishlist, cart, library) FROM stdin;
    public          postgres    false    239   �      r          0    285782 
   users_tags 
   TABLE DATA           @   COPY public.users_tags ("usersUserId", "tagsTagId") FROM stdin;
    public          postgres    false    240   �      �           0    0    developers_developer_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.developers_developer_id_seq', 31, true);
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
��X��L���ה������5m+���q��b��kt5�wC��)y;O_���;�8oW��O����x����Gw��tA��B�ś������Ig��ەl�����w/�_�pT���4w���M�GpW���$�֪�h��p�k~2d���²Y	�������-�8{[�v���]�H��ߩ���w�wAf�R=Z�	KU;O�LW9���?��ӾA�����g�`k��*#F��q]��l��Ȇ����>(�i�U�r�^h�K�1��)\R�ZͼR&z����R]}����C�k���4-=Y\	���޳7�&�� &�}��J3�Z�MM��C�vr��bd�f���yW�Kכ4gs�*.0U ��h7��OSM0�K�հ���Cs����uA��_L�և˙RE�)ֲ�+)�e�j��N`�E�6$u%$E�k���e#}��Kj]*�dO�~2X���7����Ly����&.]8O�Z+�yVq�O�}������d����Ϩ����۴�^ͮ���v`ƣ���_[��XA��wwS��3��"Pc2	����gE�(q�ˠ� 6ג�����M����tzc�A�@�F�W�T w�X1��� ���c�?�]:�	����֦t2�����_n���j:�UZ���LRҪI���|�����o�̺J�ڂד�o�QhͣS\����r6�sw����I=Ov��/�b^Џ>\�Ԭwx�k�2��tv;=�|��s������F�ߨӲ�e��V��-�t�1��@�}O5P4M隂�c]�l@��G�Q�)�'M�2�iJ���գ]��uYt����H���Tꚱg�-r���:W�v[�C67�lX��sa}o��������UT��15�z��kԥ}��jJJR%����(1�݀�z�2���*�W�i��j����>�5�N��f�X��y��J�]>�Yj0��f�V��EWͨ��Sn�v�-�j=^X�+�V9�g����\�Ϡ&ӈ�����_n�߉���wۭI���������<#)x��TU�B�qC("2�����t��;�ch�|������`���S�?�����N�)Q����*�;�Beh�t:����͖-��y�a����QGB!��%��d�E��S�l �@�'�0FO���A��y'|�����h�(�o�Q9�p"�C��cW�p��n�� ��?z�����}�/��Q����P����t�;�ӝPIx4N+ȋ�y�e�y{6�ߺF. ?9���P��������u3����[e��4��q&��
��^h��6�f��}��*�w�<�s���X(G�!�J�q^a<7r��V��b�dv;F�=1��EjxC2�[.��CaU�����5ڐ�+��;���V�rNY��87�`*�>^���ٷ+'��(x����Š��Xu�j!m-!��[:���ǿZ0JZ�~���ݱ�:e��U����,�́w�-�S*�y½�r�ٯɝ���-Ԟ>X�)��9�*��H�,CӖW%f�e	�<K�D�H+��D��ԓ����<��2DjP���q�Ǚ�@y�����~��� k�0E�Rjê��󽌗�}��p���ř4�I�m����k��7��f�Rn�{��$[���ʬ����y�^�Ry��.^H�x����T*�u^$~"���ٵ��̀w�Y�P:v����'��	7���-%���8�kfnx<������eb�Y�ٵ[��~��#����L"��1W��-��7�N9��/.;�J�:#s��������y���#`�G�``��o%�?�gK6�������g�^r���3�,�+v�L�}v�)�_��1�/T��g�z��﨔?�v6܈�����u���ZU��4����x�,��i��'�BM�q.����Vt���N��<�ڒ�(�hʁ����h_wI�����!�i�+{j�4�P�i�" �*=�;�d�L�j+	�Q����P۬����Sd� �p�$̼o��mKf���2���N�4rj�Z�)�Х�xl�4�=�-���A�v�f��C5��$L�Ό�.
�v#��;���dv����0��R��q�ɴ,G�}}vG���M�#]-�=�3�Kmf�I�i�����HF�IUPӼ+	S��%àM�+��лC�)Su0K¬F%w&�NU��"+�?W���4�&�s�Hʩ�,;�Q>��C�0������b��=�RI��$̨'Z�֦64���4����Q���O�i�e�:���E�����|r�-�Q���f䆓�}h��6P{�B��Xm�Ώ�̯��O���pų�6�h�6�d 1jF�,&2M��c�E��٘骛�)�M�.Y����niy���6��:�4�A��caE�l:J��n�چf��Q��T���下Q�v
[�q�Z�Q��X��XVa�S���L�8���]%��i�($�;�qMc�t�����fg��ߧE*$/��e���*A��#2p2e%r�U�Xt+���⾝����*��&-5��{^��Om;v|��i�54is� ��E�y,�3lL�-i��VAb&���T+/\�*�^�K'�.Wi��^p�3�"<���}�rތ~�Zv���:?u�'&,�WYjo�:��:Qu{�N����&�[l�&b}
[MW<��u~*��116hiY~���dyRn����d%��l����aʪ���S�XO�&K�RO.ݾ��J�̍������a۲�
[Ӻ��pq�NO�"�/���Z5l�"tk;��=V��7���8�����s:{���΋=CU��vmj��Ҫ��un�NOer�s���#2v�IM=u����u6D�━-g^�4D��lkU]OO���T�4��JT:��kk��h���2�
7Ҽ�������*�\7����Oj&��!=�Zg
#b��:?5KGy�2�[ͳ��r�6j�6=R�zT������c�v
к��S+OA���Zv�>1��H�fc����:�O��_I����5{(	�g�f�����h�ߌEx�0Ꭴ\��X�9ء��1\c��sK�"/��{��	��^�XP���Z�n������������K���rz9�&K����(s�1`�`�������T�uQ��H!�+J�!@@��'����P����y��d��x_�v��LX�*!>u�� ;�!�˄ח��9�/`��u"���p���-ܚ5vI��|À����� �C�Ԯ���}��훃C8�d    x��H[X5��;<���_��m�|�oL�-����X�ƞ�e��*�f�Z�,�R�4��ޟ�f�o�*���;W�D���A��\RAK-*�`ɰ^�XΙҙBxW��f�MXz�����ffO�Jz&����ߞ��� ��}`9��[ȩ�@�14DK�S�"h{.Ӎ0�
���9L%������L���~��h;yy��M�[�f.׵Y���.CbSl����o'&���]�����������������g'ҫ��س2;�q.��W���/_|��Jzyu���峳���F��7���9�P�3g;�`��埥�5a��Fqzu����Ϳ���y%]���|w�W�|s%���Υ7�?HO/��o� �?��~6���=J��[�x�w���T�e�å��/���i �M���^?�R���1�3.f�p�@�`��J�K	;a�Do#pՠ�yAy�)�,�������eVЄ;��.V;G�����p�)�*63��״jM�GڶQ\?(\VDL�Ak� Tu#�f�m�˦z���^\W�b몭�.
��pY19]��b�A���F�u�Შ�Cd8��[�mL�6����C�e�68z�W8������.K���8z94v�����Y��1�2�)5-
��Qp�bê"�.��:Ws�"V�c�rj���p�`�}ۄ�0t]k�҆��+\��V�}�Jؙ�ҍv)Ӧ,��J��yݐ�^[Ef��3��W4���0K�
FeR�2͏�����f�:�C�8��w�g�eE���4.��э)���Ɠ�.�{ʓ2(�N͔�����Pc���W��$T�Ơ+(R&s���<�$�L��Ik�1�,Gc�

�z#�BE�e�脴Q��K��֑Ly����p�V�i�4���	Y(m������Ī���X��LG�_��,�<m��yY�6�U�UH��(��BGe,���Р��Qf��c�?ԑm���ɖi���+��y��P��r��^��Ų���Z� o��A��{m�f�}5�S�Z�t��
	�7V2��ޥz%O�h"�<e���r~</�>��@�:y�U7��14��W
VIl��9r�7r���tof�V��eR���xF���&3A:2��ӯٚc��?$cD�����Fv��Y�Z�7��ikf�@��@����k�RLM0vE�B=�f&\�� �Z�El�l췘	�8PkT����A�8�H�va�_K�����w윾���Q<*[�/�(࿣*~L���p�����%P�E�����|�/�y�҇o�YO��Ǽ�$'x2פ�dvK�s)�h����4g�p��m��"�y��%����5ϼ��b�>�.�~|�����o�g/�.�~�|?�?��'_����$?L������X��@�m}=C�L]A�?BC��R�/��s�#�U�*��*��AHB�CZ0OW��r�>�0A׾����[�m����|})���G�ݫ�?����٦<�t�z�R���� "�<l�z%�y 'L��I"\dhᬨy�A�����}�j��k���ej3HU�1-���`��b�]����?����/>�|�����y��ND�y�<�]$��I9�^�`.h�~�2�:I��{��J�����bXj�bp�]��éʺ�%���l��`�NS��~�XHH�ҝT�zx� ���$� ���ID������:q�����g�r��,S�H�!��~Z*�=�����]�Μ��^;�Iw����^����T�H��:�ʺ-��#%\��"p+���T2��"�������.���̇��KM��,�@_1�c�����L��,*Tz��+��#)�q����e_��Q��Ǚ�����]���?i��I}��g�w?�o�9�u�A5;L~r�fK����E�z�k��?~�:��z��?����;��!3��z�����e[g�nz�/�V�SvrhQ��Z�����G�9%��=,����f�?x����O�����On�w7F9-IX�t�0=�:�N%Ͳ�r��Nm�Nu��؅�W��^�����������_qY�b��� ԯ���U��~D����P�.exKv������Ɏt`i2Efߒ��ͣ��-ũ?�]�ACO�2'��qu�+��E��5�^�\�3a����eU�j�s��ܙ�K�s��yIi�4��)�<�Zi��T���iVb�Ÿ������i;�F1��#�^�����������駊r�8�|��GSͣ!�e�N�_E��F�F 1�L�1�io�4t54G�1��ADMØ+~eg�mD����
 ��Lߪs�D�J�$�����4u���'k�H��صhmM]���m�a����䥑�� �o�9����Y�����������c`q���Y7�jy�u��t�@Wvz�TeR���� f�ލj����VLf�Y�ڔGq(�}[���iv�Z���]Dۖ}ն(�,�]�L��;�v�Q�$	N�Hsj��TB9�L Q��ItT:�D�ʟ�^��:L����<XU�ȡk����:;{6�Xxc�C�H�Z���I|/Q���)�Z��v��T�/��*�-��Lm�;D^k�8*RKm&�ݪ?q\8��q��[%��W�n�`�9�A4Ly�Zj���Pi�3����$cZ�ej���6F�`�1y��J[�RWUv:�+���<�ͫ�l/��)BSGyt+-��U43�vr�,#G��:��$����p�S+t���Z�v��yS��p���f[;���'7�o���z�3ǆ3�l��]�^-LfRS�A�
g:�e���n��}�j?V6�͏gZ�
���_�z�m��F ]�|�p��Κ��S�D�w��ɉ��f��� ��>׼ X%��jr�v�A�Ǒ���'��c܆V�;�g�+�~�5�:��b�V�f�ڞ���!FZ!����96�-�[yp43��ʩ��靱Z'���YO&��l��1��ԁ�[�َ�2
����J��d]��Q��:�-r�B�� Q�p�PI�Ʈ�l��ߑJ�.3\)83u��º��:��	n�W�-;]W�J���.��
�G'�y�^:��`-P��G�k����G{�N����4im�#���S���ʢ�*F��ׁ1�8P�	n����wM;�7���jw+7rS��@#e&%�I����SoZ@�2�fDI���`�e1b�/6���Z���D�Ni;yz�&12Kk�@'��j]�X{1����]�R����򔖀��r���L�&�k��F��j�9pw����r�jQو
��r���J� ��.�����j\���	/��C5 8��b�Lp��S��"���ә�ЂT#`�E��5�q��v��
�6�9;��N�s�)�J�I�y|��]�S���~�e�qW�B6:�E\��	O�Ԝ4�$�@�
��r���HZ4g��"3�R���Pp��?��؇qjg����M�f�9�N�G����p<���7{b?���\���ub}-�����Q�	��P��񌻍(L�'ĞI�	x�~��i�p,=AeI���f���o}��
�?]����9�Rh��'!%ge�]��R-ʹl[�zO��f&|	�̔�0Zt$�����pz�Q�
�@p>F�<�����[��,�����Q	���G�_��R.q����<e����>&EhKaE� s���ߥ��+r&����=e����m<
�8�Q�z��b�!���0���q
ԤmQ�_Ό���f|72w��S�3���N��g �z�FN��az�V;���rN7�J�FP�O������91([La_�F���@�8��1Dy�G�df���v �J�~��!̒̄�d�f�{�E1xs,9y�(pm~��-�%<���r��E.�<0,�U���:�h<�>���. �^��M�V�	��x8�w�����ر�~�Վs�G���94���Ȳ�?��O���\��B;����wU��:vk�J|��dj�����>L��Ut"A�#�_Cv|�bٿ�s�3�8A����}������z��)��_�T�M��e��E����'~��ې[7������������q�A�Oؘ�*gc�~�Z �    �ޖh�̳<���Mw�9_	�l���=�U	�2��?��:U�篯��F�2��L�t�V�����F�bIP����C�+�y>�2��M�S'���ҹ���ٟ��W	�b�ǹ��!U�s�0ch�\����ߋH�o�Ji�v���� O=3s�U�s�j7����/-^I��<|��\~x��j�[o���3�3��6�y�_�{�[ج��7o?��R�u	e=��Le@~5[�.�Y�4$cWrk�� I ����U;���5OQ��d������/��K��-��O��;�d��C�1�۰)���k�=?�6C��D���mQ��y/� Hw&�4�?��i�N<#h�9�̐e���7�7�'f'�B�>G���<a�-�Z�+2�=$Z��c[0d��5TD�m�sX�{[�����3�]Fc�lӯ�:�Lz��!/��>C�}`�?���;�"S���,�a���
9�:|�î����L<�m����S��٘
C	�u�[J��:�Ł�bzR��w�>��* ʙ!��.Ʈ����sv|b/ր�Z� *6p��vH��z |&jxܾ.^	��Q���<�w�5�2�-�݆y�u�Z˾�[4.a�9��[j�t���gVz.�1�h�pG�ky0)X�� ��5|@�*M[����#*�!D�[�2���:�5�v�t>E/rU⥦af����֘k!0���^����o��L�iѲmy�j�F���c䮐A�NU�v��� j� �����#���}�j�r��yI<�����s�����!&����h&Bp4:uy���r�����r���˔�7fk�t9NC�����!�6��ޘKz0��v�b�b
K`��ʙ@c'��=���E3�(�sx��`�Ay�4{ܽC#R�c;{�O�uҴ��n?gZ�㋍ۍ�l�x�CöƢ|K�۸"f��� n�}|�f�^e.����Q��g�n׃���\k�ԻO.���5��a�,��b�4��=ކ�8Xh>�C-����'�\Jg�-)����3ɡ��ϧ��Q~9����8�л���[���H�ZFo���+~������	� ���O�O�	ҟ���+����m�jw���?�7GqMr�W��E�<4�u���Ch���U���6=��6e㘒?�㺐>~�E�xu�9��'��r��������*��_z~��Ԗ��]v=��T���k����Kʫ��W4�TPհ���sk��FK�^IOqچH����m�,���6:[���PQr��{E5��zXz)��@k]%#�ɼ�)(�T���9���H��4L����a�ѕr��{��=O1�"!O���'$����n�{�T�D͐ɵ���l�X�Z`x��,������yQ�N�sh�~�u��'秊}��t�)eƋb��?[*k��D��Żo��Qe[zQ�Z�@5;����u�l�w���>|غ��[�ş���Wi��^���,�|���hL`>	���sc- �+�g-����u�խ�uC���7�����p��_�nx�@�><}-9���ϰ�=��e|hr�|u�+�go{��ũ��;t�_t����[ J�x!�/ʐ��P��[oxuu��geP'�[�қ�\3ע�h�P��l-�a�9���T[��TX!����N	�Y<5����o�=�/ͥvm���b�  �ϥ�����<X-�v��a�#� G�"\?*��g�b�Ň���zQ�3̤��r.��H��zK2�] f�I/���=�"t��9 ]��:���k���,�yr~���(�����Xk���0b��{&����k�j��We�����Xc�kq�3�W؟���6��D�W��S	�� ]�W�k�Dz�-��`(�.�xSR^�xu�ށ��ʙ) s�ݩ��u��<������3=��V_[,����Z2�=��\�L%J�eg���fK���:۸��=S�L �D��|����z�x?��y��w0���VDqH�k	]O'�c3v��R���R�T���H%�Ov�X]����.F/Ż9�dRvm���tI���M~�s�����R���I��M�^�O�teK>cv7-I�\���7�xE=A�Kd�a��i�S^j/�L8���Cl����KP~���S5���BQ�'���Z@5 獵���ʼM��m��7Wۻ�b����l�'ۛ�.}`�m�}��`�4������ܾ�I��u�Z���z[����f�gDa�����j�*ki9�	�#��C_$!�Z�{��={ �̳�+�6k����U՝��⮻_]\JϠtaJ���o��b��|�&�-�j�	zٗ����u���/�M1�|��s�Ö]���ޫ��@c���+%�2�������[."p��IQ�[�B�����ϫ�7 ���/�ǔ.����d��mR����~��B�>��5y4>-w��^�:�M�������jࡾ�D�⦇x;Y+|M�#�����n��%���_;��M��t����^�~P��^��S��i�|���I�um��D&�L� w.�Y�^[����ͳށNЭ?�ٶ֒&�Kk6��.KK�Nٹ�bs?p�)�Vg�l`w��������ũn�e��`mr�v"��4Hܢ���1���m5�+?^�p�YC����SBl?���+/N������P|�C�x7 �/�k�$L�J��>]Sw����K���>�$�����0D��Az�2a����
?�sE���O�kg�W�����W�����e�ڈ�&z��0	C�x�'y����ᚎ���k�vA�L��i"]��u��;�\]�Y0��5c�L.W���٠�^��ʠ���{�//�
［��5v_��A���贾ƣ�}#:^6�im�%��-)��s��4�c1,o��d[�|�w� ^�?z�՟y���C��_�uY)��h�7�[�p�p5[s�p��)�槈��W� ��l���gl�����ܮ��@�Ĵ����LΤ�b� }�,ׅ������ ��WS9��a�Ͽ��?_¾<�+jR�Z��h��F��s���p.h�<D2,�hQC$?��˶f��V�':���=��H � �f��=E�	k���j���O���3�;g�路���)SQ�ղ�x�iQ.�R1�\o��RN���/��h�"��o2���!O
�P\"�cc(*���y)d�ЅB	V�S��.*��@�<g�1Ż����%��P
����)�i�Ai���;骀��P%���!��d�w`�gW
*:0�!qfM2,^Ԝ�s;N� E%�i'E��"�O"N�ľ�� 7����:
��/��m�=&�\�����]`����������O�K��E�|'�k��2v�l�H�|a�!�d���j�*�����<�<��}�9q�uځ��]|9�	l�%\�D�%��j����1���.9<���W��Ծۯ�٪���N�̽3�c�{$%<�}W'�J�w���6^' v�Zs�`ʾ>����(�%�{B����Љ�2ّ:|���7���;�����
�����H���pxA��%�IE)JIG/�����0���]X��73B#�@@B�y|8�E[�:�:�( �e�#��-91aT��4b���~�"+9��1OL�٢��9��S�Db��g2}�˙냙-�	B>��SvN{ ��=��Ykdl3��Z��`��S�.Ze�(Iٺa�B�Ú��`��:l�q86�j'�`��+�[L�S2Ʌ޶�?�j�Iö��aL����*쵴��Ʃ���d�(ݲ��JL��c�U��e�Г|
UUǥY��m����-L�f�:-3/��0ǝf'xrb��a�X3�IQҼiZ&�Am%w0A	M�qӨ'%�Q�ٸ
�*Ԓ�� �h�56I������D�]L*�4�����R\��Y8��2AL�&����n㕪��(,��0A�N fO�� U��sroH)��g�0\#��k-+�V�����g� Pf8C��a��*ul=U�4g�*y�V�\�2՗�J7��xž@t]��6u��e��4���ްQI�Z��}����v)����]j��0T��|�    ���L�������gv�8b����Z)�-�z/R�B�W���"Y�ƺ"��J�2�t�����Kd
�#;�u�:����V�q��$,4\t��T�o8}"{�����,e�2�e$Aަzn��4�bż�֓>�c�A����(�G4����-.�M�&J�%-e�N^�+�6����� �j:�+�Q/k�F�c��^�%�Z�r�i�؎�χ��3�N��J2�~��z��e�����ɽp�q��f[�vj���]����X���L���*L�QU�G��[l�M7fv��^"[J/wV��R�q��]��N�WnG�̆�m�%o�^i�mZ�΀��N�1R�4yÚ�޴k�ezuu8�Y��E;�X����妵�0�i��D�b[������˩��]F��d�1������R�4ǎg!�7�Կ���f���T�����7[{Ɖ���#x�o���e>bﶫ<����o��8y�־o�G�[*+<���j+<���x�o6���{>�E���g�I<N���x��/ -�G���n���$l4}wm����c�1����9l����c��c��c��JN$l$�i����ys�&O��k�½v��l:ظ;�L���$��]o$��)����i
���������"-=�����Qn8�+v�B����Ό)���8���f0Se�����H����
�3��W��4��v�2��<L��Ǳ̃��ML˂�y)��;,�+"|���H�9m�-%KEt�J��g��A �����NR��R�Z�ƭ�9Vd�ƃP��Ґ@i��b�!)�4�%���}&%ysA:�j��`!0U>(� �mΟĈ�
���@1 ����1x2�L���'��?����L!�Ӄ��Ol���O�\��� �0��I�Dn�%-���s�&�g��hܧ� ��E6�z��x�}�sF�/NKw������V���zO_ 9��vY�D!Ț��2���L x�'O�� q�F<�p{ȞC��SA ��Vi�s����@����"lA��o�:�)�Xsx3�r��~��i�h��h�Hzے�qE�/����;�j�P@0�L���vP�WS
���o��G��«E���:�R�W�r��n���ճ��@��iY4�\�N�����0��{��kH>P�6�#ă��,��/4 �L��;�"u�T��?q��\�kݱ	���n}`3�Q8�N=�958ϑ?�B<�����O���"ˢY�1�~=@���2��~���W6p��T��6�&'<"&1!���
��ߒw�� 6�겂-��^X��j�O��ŇOs*1��2�ζ����h��fl8�Iň'��p�����	��3��n6�9
WK�P@H��d�c�e�A]�
+���n�B8��	�4�����"�����z �x�b� ���Y�;��ũ=���Zr�DPg�9f���l�	�f�t�
���;��4��a����T��,Ͳ��[��l�]����I^���~�+���VL�)in���`����6J��r�As$�9Ě�R�>P3Uy��m����8{Vk��Za.��|zx����0|��7E~����ռ�{Y`��Aۜ�3�O� ��g�}���D$jQk������U�B��a�-��gX-^�\�e�,@�5��7����(N_�}�;�<��ν��!�.����s�ȧ���k�u�vwp��}{)@%�ʂ��(���Q�d�2q�=�	��Z�/��2�'�p��$�������^vI<�h�޶����<pL�r�C��|B����]�`.|��P��#=�6�q���gFE;U�}���^�T)Þ�Iꇴ(�\�<l`T�FӚ4�TG�Z���"ǈF�0*���d錝�E�:f���FE���Th�QoţYy=�I��Qɧ\㰓�	����1*q|+	;'h
+�]�P0��?P��uHgڄ����݂Q	c�VԪH���ꦣ�f�l��c0*��+u��ߥ���@e�����T�}����vD*O�¨�2�ƈl��3�d=�|�.�ʨV=;:�c��]�1�\6�T?��TF7v�"Y֧�����`T<O3'�Г�t��S�ʰ����b)a�Al�F���3���?�Q�����׺�ŨS�Ҥ��`T�1RjB��q����j�z�QqMvޠJ� ��}C�Ǳ �n�?�����&���)�,K�L�+�J�*fPx�F�ZK�z
�n ��AL$F%.�p�gC�I�^�F��̴�=#�2�f_*]UTN���l}�<O�*k�˜F��Z�@W ��M���a���u���v�[��c�t�4:F:fe^*
���J�Mr2v�c���2�������cQ*A��IXNz´��41�h�R�e��<�L'�3����űUnt�X�Jk�٠�z��vӪ����P*-��8us�U�VwQcխk��F��8��Ӳ6�,�j-�[��y2��!a���Ξ�I��A�_���V	�c��'ce:�L� q,-4�u��Ѥb�jhɡ�M)���lTO9�@��f1�m�6����F��Lv9������ v����B�_�e�GD԰5,7VC���+��iT��(u"�T�0CA�i�;G�a7�ܒ�����6�[�a�.���h�lM%�b ���r�7�B��2�a"�<�����N����neƃ���,f樭�d�+��n�cn������̑�R4bl����g�e;���C�����r���|�(��Q:vZ�j��nU�à�NOj��t��ƕ;lTE�7�j2�Ό8��� .�q�l­pJ[�"\ڤ�>\#��?��k�}�Zx0���=�ةD1?�0�8�!�l$��*I�ڵo)	�_��M�ď���dB�h��7?ۖ��K"]+հ�����Z�~�g']�*���IRhq�D1?{�}e�)��M���e�Ecl�	��~vdji�
!}lf��2�ln�v�ǘ�X�d�ݴ1� �i��ຝ�z,lݍ����h�($��֎ ��h�8��掁��h�(��֎ ��h�X܍����h�H܍����h�X�ۍ���m��X跻�>�v��#�o7�;
�v��GC��ly|{� �	����1�������܇�Gk��z7�>
�w��c�y7�Dp��}���//�A�c	x)�oQ�k���78�h����u�.D�s5J~KOS�%�kL�`�P1���+��0��8r�\��! ������\Ѓ}�yVpFƿ�����Wr��9��3��� �N`���?�Ϥ˔�a�s��C��VT/��&.?��S�/��"{_'��$o�ܺ�:��
� r_����O�G)��A�=��AZ
k  ��(iU)�� �m�?*�P�L�9�gA9��Rt �@G&�hB��W�s]X�����ƹ�r?��G~�`%('�^=F	�VKXXӞ���Azq���ݫ�?K/߰�t�O[n߯��Z+�;��H65��k8��gR�u�3��q��,�uE�f<�%��p�k��2ě�$���D�'�p��?X�G���4�U��s��"�"��
p�@���4AȸH;N!h�EA���; �5���Y��K`)�d��0]�s�E��  �̑��H�6�
�FP��=��BQ��G#̦f�D0
�(��WKۜ?�B��YD�YpY���v�*� '��RM�7,�d��J��! ����d�@8ƫ����������(��i�ysgׅ�����߼���ӧ_�� ]������7�/�|��!��\!�+{{�*���I��="j��9�@����r�Nӓ�<��6?�R�*z	��0N_CE�7��'�)��k&������|�����NA �~
���mͼ���	}"$\�*�(a��
�����\h�@n�* -/��L\��ɺ1
�{�<*�'�n����?�ɭ_{mK��xi,�3�a���|(x����F��>�:R[��0� N��=F��㚦8�\���1E�r�Us<���B�- ';�*%��    �>Ø� f,�f���� ZI(���23��O�r�����j�k@�a�W|R?ݎ�9�Bd��F�B��!�̭�#+:1f�1v8R���uF��Z =7 <�Q���c*�ˎ �j��=�������������zy6[F�Ht��������;���M���ޜ	(��Ւhq�7���@�S�� �=s�`��*���nDQ'��b�"^7����F�<����<ʩl���CYf�xH�̳��S�BVt�R��R�>�]%L��N$3�rT�!x��BZ�ev�Z�(;aض��'FC�f~?$M��~UiN4vZ:>�S�f����3;�}�3�6<��3L�q}�eڥ�o�<�hU�ɦ���c��6�oA𴣯)qB*W�5�����EB|����J5r+��Io*:���@�teE;�(��r�F�&�`a�(OP�Uѷi0��j�mET��㛞:9���>Ǳ���Y�yk��e�q{�5[�-�5��F�#��;��7m�2��D�Qw<��]=P���i�>�Ɏ?����ԋ\�LU;U^�`%5��t�4h��#=WJO�dP�Z!x�^���0퀻�z۱*=
���k��{G�G�T
���"=�d������2@��ږq,���P��h6��GBx&m*ʮ¥9�U�L	
�r��<j
�7��L�ە2�J�l�Վ��	\w�
Ka��B�F�Fm��G�#MQ��l��f���ԫMb<>��ͨɍb�Nk�}i�W�,�� +A�y�P�e]9zLkcCb�����B�2Yaˑj~늟� <�B'Q��ohck��M.2�砙�S�n��:c������䚗d8��	;�zN99��l�6if���ƣe3e�i��&����a��9æ줊Vոӊqp97�����n�,�:�G��B9	�>]#x�&�b����k|=oF�7s��68x�#x�+6��t:�JQ[F(�&&��<:JRj�f:t���i�e�4��� ��`TH>�)�i4��s:��ƨP/N�v��'fwFY}3���QqZ����G/R��t�Q�0*AU��<Kt�΃��(����� �B��)k�n��Ԙ�N�R�1*A��ۧ�Xm
ٌZ��&-w�G�����~�T���.֜-���tl�@+�<e�"�3�x�7����\m4e�L]Ss�Z�wlz�4T=�;�LI4��5��}�Q��<��Y�������7?;R-�fߌ*�cV�V�\G��6H���mc��-A��v[���}AT��-��}`k��>��ðl��F.�~�8��9���y����7숕r]�	Γ9�x��;�H��ɾݟ�{��M��Pw�+�W���_3�)�C;��$���9�:�y�Ή��lo�X7n�̂R��P����i)��=R�3��!���K^��>+s�>�K�^C~�n,��M���	��8�u�w!/�贑x	�q��?��مX!V��ս�9Q�z�3n�K�5<���0k�����L}�3�ӽ~:�cܧ=C��ws�3':a�����@����s@�"b�my�@��"6�!��GQp�9�&���🙾{���`�@P���s��2x���y���[.��M�{�3����،�,5<� Q�����
�	���� *٤�<���j����t�:��'3�����z_@M�qRs��!��F>DQQ-�FxQ���`^�bFjL)�"��x3O��SP����Ȋ�����7��fOC��v��@v�	�CH��}���?Bh��x��f]�Sgڦ�� ���fh�)Y�����_Hq�� ǵ�hSJI��?��%���<�"��o�|>�����C��8.�(��K�A��ox���2�{W�T��kT|�m[.��rP�E�?��{^s�6�G�]+h�9�����P�͠xj=n�>tm�vѣ]��͚�Gj'��c������ȓ�!�d[w��5?�)	_T��g��դ������9݇�n���F��z����B.�W��?�9@�Ece��EА �Be�	]�� *���|Z�Y	*k)@�f H���9�N�D�!Q+��-SR�挣Q��1�yh`L����N��Z��1��V6cf3J��֨EU�6v>��#~P`l�q3xEW8l��Mq��[��	�Ȓ;�a3vd�{}P`�k��J;u��͗5�U���
�h30����c����`��\	��䡁1G+˦0K�n�BuM#��n+�������izҷ��Z��Q��N�']��R�Qi^�����$��1P�d��7�I�H��e�����M6����8Dwƚ��r;�٨V^ںo��0����X�7�ЎSZ	V���آ�L`��h�4y��2�G�-�S������ؙ@m5e���AF����|>0fT���Q(U�)���)�q*�c�>�
�ja�}׫�O=���E���%�'��玡�U1�m����^.5��i��ؚ��x�ӻ�hИV=�CQ�)����#�;I��6k���z��:)��v��i>��b�A��ߍl�ʆ��]iz3�i\�aXE4��X���8f���\Â�^�		��=FW&6S
���$L�K�!sW1:s����j+�4�i:�ʆ��Si셶�+Uᢸ,+��j��sâq�)%�A�$!]��?C-���C�Q`�P�ȯG�� �A;'�|��Js`���W:G�p�o��k�Cw��֡��P����:��U���(���:�l1Zbn�U�w��I�V�::�#RFC�[����GeN+���X��s\��w�)[�C[;�����mo�#��־�#{|�G���A9��u��E��5�??��-��X������{I8S+]
D.а�� �l.��3>�c���#�{����<�6��3����T��������d��AY�q���ǀM���V	�
<^��gG�H��o��]ѹ�N���axx;)z�&<\��żH��	����	޹��>R<�
���R���O"���s :�^=>U�I[� ܇�P\�6שF{���4����2�[v���d��y����%�^��~/�N��s���vxp���ӡ����Yv��#�,��ŝ�>ӡ�T�!��yeVN=˱�"�B���uϡ<%n������;�b!�]�_�cz%�3�(gT��	��BB�o�[��0٠ �߱S~3zR^	- �S����1]���,��,/�?�=)>��M9e�C�flm��('-_�䇉�ُ/���럢�����^��KD9^����H�[�2�#f��x>P��L񈔧fY]P�ʛib1$��##���J�Ӝ?�Z,��@�<}S"_ |G�p����_�/ˑk����N��Z�A��#������y5-f*O���p�#fÛ����&���n�A ��� �tj�7o�����W���MX���;U�p�,�*S�u|���t����˼��/�8�I�FU����<w�/���6^9ԝ�-K�;O��y�����l�\,oR�k0�)�r.��ux�����EY��M�T=@�ߏ��m�i1َU d���'%;i^��Ո�t~�Q��H}���ʕ�0�δ����#��rR�>*��O���V[R���D�|�0'eW-r��XL�٪f�Ϳ)g�՗͐�&�L2Cƨ��C��t
t��1;Y�oǆ����IdcZ� �I;5H���Z��c����vIg�N�w�絮l;�NJ9�p��v�Nv�:���q�eSp��2���h���N�e�Ikb�w9)c�WC$�1)*=%ִF��X'�����:�FkӔ��1<����2I=���0"�%מ�)j�u�>�Ii�*�̒}`��j[NjN��:)+�L��M|��c%�p��mW������v�H�o��(.=X9)K�LtH�̺IL�K9���cy�J��1�t�t���!��a奌��U�692q�7CTI!��g౩��Y��.�m�j��ܔA�ʬU}�����FJ��jVl@�tSvɄs�ٽe�VF�+y?Z+7e��Z�;����e��}�eQ��@w,h�q�X!1亵�-��7��� �U�ܡ�nd��m;ѭf
6p���)Cg����\!�e�4�-��S**�a��    j����f�=��;2�@N�^N��dm�GZo���+7%]*���ŉ�N�Z� ��d���f�m@G�1����2?«T�L�efKM�k=� ն��[\���F�P:F�e�m�v6�Ӕxk�����mP!%J�r�����Jp_��$u9�<�lnpm�i�lyL�I���w�HVIJ��xq:e�Y�� ���m�o�������Z<���7�s��-ٲw����O/�>��k�
y)"�0tM�J�m�op��v��f�Op
N7^m�ո/;<0Aq�ˁ-GQr훯����.ܩ�5���.��|����H0	a�dG����&��Ԗ�ׄwQ�+p������%���x�����9��O��[�u�E&x(����H@�FpH�nK*�E?� 0*���ě����&�ID8�Vd$G''�E-8Ŏ �a���p��!y��'�la�
8��Ɏ���'8�P�)؈÷�8\\�+�n�_��Cz�b��T�8?�N�5aˎ���0>D>��; 8w�p%��v[��ʵs��H�qp�KX��(�?UH\�G	p�=36���H`�wl*׽�?s��k+���߾:���O�YH�Ϭ���.tmM�+pz\�
��"��@��Fr�r�Z�A�	�]�f]�;�c��G�	���Rh��چaʴ�ae�6�a�x؆��;�	���w2W��-q�˾�^F(�u!��q���ǱWs�Bb1�|!6��8\�M�T��)�Q��=�D�����-.|��xḯ}�p��s!^�����ׄL=[P�Ky��#^�e�,*5����U�UN���3���Y� �<o��T�s��3�}��p�3��F������jZ�%�P��#A*w�WBx���	TRCϕ��v��Ϥ�e��p�iDQb�P�r�BAE�'��@�����y�D�l�f7bS�#f���p��/��|�u0�{��:g��\ې�����H�:9���Ќto|��B�)w�ݖl� >,>�Hh��س��քK˷��K��/�Ӵ(����/1:����Ö	���/НH�~��U��� |���k�V��t>�5U[����&]}U�-����O҂����[|r ǲ��U�;H�p�$��wF�~e-�H�����S�"�8�s���9k��?��+��sd����kj��'I1M���Y��M��1��f����Z�ݍ���`�{����ټ�9(i�F�޽�8�޵.��m�l���8��O�*)�aMG���yt���N�^����c|��r�����ꌷ(P�F��N��u׫����?��q������+�V[�Ρ0�t�p����a"�Q���c�B4� |���$-2M�\�ٖPc�D�V-68E�ݾ(���ߨ�WWZ�9��C��l�0������@�� X�;c�x�9ez�F�E]g^����*�<�I�ш$��x(Kp[P�`j$ٵ��o8@���O.� �b��Ω�?4@]��t�����5�RK��F�GDV;��Y^��N�.���K��y��]J��*F�I��I���`'�|yj㴡���a�� ��`S�
\�:�U1���P�r+�]v�Z���#�j9���5��Ս�IT�ɰqK�:�5��������}k{VEl����ӄ�
Z��(��^U�� uE��VG�
�N5ulzK�2��
P{�e�I�UV�$QZ]agw��W�aؚ3����}��2����r��O^�G�'���b/A��� �o�r�Z�L��C�ʆ8�J���NZ���,�ti�u�j�u�� uYT8%rP�F��F�ˤ��2���Ƽ���Fc�o�]��� ��*��!��)��TĥڕT'�����L���b���ԡU��J��� �I���G�I�o ��Pg��C��t(�����*@��uS��eG��(�X�c�Nã��6�
K�pnNCT�I�
PSM� z�,;�ϐ���tXG��x�+dxMR6}�2;Q����K��6���}!��ҭ���7Y�ɲ�_��E�{&̃GI�Ќ43����$�ͽ$E\�P̀b��X�t/zѽ�E��>">%����o���ч�����0�p��p�=�����ˡ�骲��^-6�bj;�u�z/>mi�o�ڻY�e�P���'��BHxhM���������M_�{W�P�׷:�F:롵Ӑ���h�K�SM�ȼV[as0�ё����^�}���]�e����X�W �U�^[�v�E1�reT�ا�k�����'V�ؖo�}`y+��C����'C���ˎ�hy?���*I��mP#�3ݛ��������V�*�o���G��"%�G���#��c%�G���/3�B�Ӊ�cѮ����M��M��ĪF;��̱���}��fM/{��^Ԍlah%4�$<=d��~�Le_yҸ4���A@�Si���6je���!�iG$s1�+h���rl���g�+�<��A<�9k�~��N�U�nēkϮ��P�x��wd�o�m����s����)_�x�ǂl��#.k�^��[��``��n��ũ�O�?����Oga^p��` ;���.�/s��+��)��`V����VÑ�Py�IH���|Tu���P��O3fY�M�����(D���Ϸ�Q���;��~�+Y�r����y�8��,��	�RB�:!i�>?�-�������s,v�h�>����}�s�)�DH�.���8-;gۼ�@>��g�{�Վ��ȱ�xb���t�[6C 3V�}'�ψ�M��m��	Y=�Yi{�,;a_��؞8��a1�`�����z&���s,r$�:��v�lv݂��肓���[6�� ���g������:��T���	���mSC����K�%�,H�DI1
[T�e-�PV�P��pf��d���@)4�fiŇ�܄\��h�nA�	��ԕ��O/E�n�"��x;��G3��B5=q|�i�Rv��L^2��<޺��D!H݀hKɷە>��8�B}X�c�Z�+�;��Tx=� �2��mB�.	C0ܨu��!�<<�����~���=wy}wws��K^)��e���t���W|����VC���ۉZ�XSUY����xo�H��g�� T�!����U��%��#�����Tp�$���OF�,IgU��H�N��Ѵi�-!�U�~"t�����I�����g��=qc���Wg�����ݫ��������F��I͐��#�J�#[��rͽ�hH�fP�� �tsy{����?^�ݜI�o�_��~��;{-��xu�����`X��-�I��׷G���c�1����;/�_PΖ���:�uy�V�%h�����T��7�#؛��^NR�+w�y�ݢΥ�����	!;!��q�K��`M��gSE+}�����{6�F�%7̲��K�	�z ��P�
�4~Gn	@X_�⅏�E[�`o`���L��M���e,�u^{��9�'�k�q�o3�-U�����J2v6���Q���󩦚i���`OrТX|��J���J�Ņ��q�8M��q����cŃ�F"w2V�~=�EJ��I�l��"��F�)e���1-]V]71���Ip�E�����+�'[T6�����t&�`���Pf6����c�h���D�K�(�qd�}�Q��f�fV��2�P��8u��+��~*�E<C5�l�Z�Q���;P]�C_��A�͠�B��#���&�f�A�C����JnM��|MͶT�Te;H�B8�����TAaf4^��ds��S�1�q�/GmbV��#��(P�ޱ}����f]��f�� �����'�D��h��y�R)M��{�i$6t��z���3�^�swM%���C'쩥�k�.�j3,���{�N1?�]�d�P8E�Xf����C�L�F�N�;F��)����N]��ȕY���$�Y'�8�h% xhxG�lKꛣ[�|����k�Z�S�v~☐@;���Md}6��p%.:��U���'d�z�e݋�Z�'��3���ޢ�f��+,�wL�駸�m�%��    �O�~|�N�fH���d7�ٖ�.���6���s1f2jm_���(��1T�~x'7,�l��l�)��#Y��0ӿ4���������e��i:Ejى�/e��0�į��a�q�xيNٺ��C��|#�q��4�a��%P��!���]4�m��5M-W��\��doC�	�mmj���e�6�ʮ�pg�e�j$�2�[!��$\)�~`q��G�&5Ҙ�c+ֈYʩ�뉃��&e��)��)�:Yꊻ����3=�Β�C�4Ʃ��+g��������,od��r���P�[�Q���̯5��Yn֩����>F����ܫ�z�����Ū#�i�5N�6�U#G9Uvr �-0����eyI�A+Vf*�P��Gv�%I��è�mk�y�*�.y��r4�!��:�][���
٩��/���rS:f1��cݡG�W�Hk���N��8��޷U�/�i�m��ɚ�<4��;i�l�d�v�㐔�,��ʩ�F��l��l\n+cu�#�ʖ��vO<��c#�[��I��Y�[��k���Q��2ZO�Y�TXNt���l��bL,��Y�Ҿ�]#�Ҧ:-N�&5I�}�G��5�8vڮ���2��I�夔�Ξ�.���M�)	��ǃ��Q�	'uUgZ�P��K������'�6�'�qV�I\WU�V��v��S���h��Ҧ�Ur ��I���9���Y&��r���Ѻ�.н̥붖x��?l�׀��i�S�h��X�mm�ao�S~!�� ��;Ҽ!�O�"�)����P`)�b�
k��7HX]s �o������֖�lG��X,�v�H�w�ͯt����K{�`��:�Fy�����,��_�A���t�L��槝�/i�˼C<�q�%7_�<_�@�b��ܜ(v9X"W,2f|`Wf+�zٙ����(^Ya�y�%?q�y�rK�z$edXBʬ��O�� �C��{4����$oq�8�g�G�+w[��iA ePZ̈�~a�e�sS��w�w����S|���La����
�-
�ʻ�5+f&X�g��!�M��#�e����]TC�Q 7�Y���=	�H�
M��m����{��A��?�o;�Ʌ�&�p�ې1|�I�"���+CR�=a�%|,�?�3��� 2����~y�Y��g���(�����s��53���`�� ����ǜ!�C�&���#��9�q~>��B��u�?U��TQ��m��.�j?|��TVf��[�������t���kr]gM���: ������w�o���I�t[Mv�P5�=�W���ӓ{٬��w"���^q����L�m`U��m��c
|E9Ψ��SN%I��_]ܽ����8{�F��{w~y}+��~y͖8�5=⨅󛳗�W��MS�S�B��S�ͼ�����6�(������������������Rֽ �ss��������g���ˋ���J`ZB���s/����7����nX�	2�� 
�L� ��w�b���t�#�����kP(	b�C5�e�)��|�����@>9[+d�6)��0j"�#`egSp��R�{���Au�]H��ha^�[ j��l�%A�!��t0��l/��g)�W/ma�<2f\���e_�e�ӽ疻�>��
;Ǌz,��>*Ux4F�t�3L��ab'���
b"�q�MzY��h�CQ��Y�BLD�W�V�m�'U��u�4k�	�����^W�k뛢!����x���$����G�"&���BT�JTOIk�Mߥ��X�D��9)���R�ioš��D�Xk�^�j_�K��BO�ALdu�惩���D���U�j�@L~�+Y9���⠎�r��jCL��O&긚�x9ul,'��)�Dڅ�=T}��/E^Z���w(b�6c�R ns��:Y�s����չ��)Է�0��?1QW��u�wi����ia��ELX��*vPպJ��g�S	hUt�#Qn:��f+�>��U��/r�IikSJ�!�ƶ	��pI�;4p��nZ����O弈؆��7\-KڡqZ?KTӌ���n�V���o�fF������Vc���Qs����5�eQ��۠ASj<8+T�f�Z}1a]�����7��x��⮰;2Vm\M)CT�Yfړ�7�R�i��SZ��$�z�SlV�2���9�\�<5���P�y�H����Ʒ�11R/5tK6��a	3�@�KύC��<�:V���Z���a�nJߪ�>2�tV���Z�e�ީ�DI�~L|��S��cBC�Sc��K��Tmjy?�;�@��8�j���P�&fO�*ҫjm��{r��.��Z8,@�5�Q��~�t�Dy%�])�j��Ǟo�ǆ�N����.�?����F��j��.HT^BTs�:���d�T�f'��~57⑤؎s"6�����w�|�.��tg�8��3;20K6[~.Ҭ\����͛n?����≤�"�!�.��yvu�Ipr�
���H��Cr�IE
!�3b{VԜo1���j��8�ǹHFl�h6�|"�=�P
�ql�7%c��n���5/g�xB�ă�7=���i/~�-�
eZ�(m�eo̟�G�T#����:��g
^�x�1�[Ȁc��o��Elo<^�ۨ �;vݑ�zV!���{Pc�����Ё�0��+�qzkT׈�O�E*=Tұ9:0k:��Y�lbAͪE h9Kh65�ݱ^��QSM2��匱Hz&,����9�ɾw[
#r�
�*���`$��Y��gî�@�'�z^�,j����Ң(v�"J�.�[��M��~-X�Z/�ٔ{���
��Ap0�Q��l�ͅ�I�k��̙����>�E"V�]׾}Λ��s�M&�rX#x��?��Br�M�@�W���;3Z>8;H�)R�i8{����v6	��n��V9L�JP�{f�!eV-�ƌR(t Y�٢�M7ső���ϫ�Zl�����D>g�]@:��~�������h��������o�<[�s��l�mQf+8�����0�]^�:���� 6��x��󲰺Ҍ'���e�b�bJ��㓝ʇg0�^��,\��Q�H�&`�PU`E�*�`�M[α8���6���x,r$NӆgEN���l[�a�ߒZ��)yޜ�R�7�����'��g�ѱ]��MW�e�1��/
��ƖJ��Ǧ��X�໵dI}�l��V���)?=yV�w��x��5��~h�����9�&�~�ڮ�RؕO����F��y&�>_�Ī��(�~��}�Z��������u4�a�n�W)[�䔓 d|����`Ccu����~�a�E�������`.�=����X�ɳ��.<�X�@��"`:��C�O�<e��Ow5N��~��\8�q�����8�8�3=�ܛ=8
At�g��1�3�K�0_F���,hN�#�w*#js�a�p������V��oN6舥�KC��|h3G{�mc*�ϼ+xͅ��y�!�a��p��`
��iV�|Swʧ�%�Wfn�f��w��;������Ż�g ���Y%�o���_�,٦كJ�j�V`zjP "��7���5	n��f=�\�$
������M��ae�!b�e�GmR\��l���ܖ(���ˆ�ه0[#��(A���֢���#�%��]'ّ���.H�<�Z�z����e�������6��uA �2X�@�R>�Ah��o�f��\��T����X&��c{Ҧ�z�q����3�4�(<CQ����Rs��s��BF~��S���g�4��]�چ���f;r$]c�����&����>�f�}�	PN�G8��8U	�oHhu�/�vo��y#Ə��k3諙>����A긁3��>��� 1s���nY
m�����~��sco��l|��$<�~T0��A�Z�V���\����!������o�D��HD��?��*�Ʊ�H�/XY��/��h����#q�ňq��O�e����X�!���.���t^��9'8/X���s�����b�����F6?����d����8g@��of��y���f�bA0�$�be�׈
�|,    �;E�����.�${��%�E����	�jlȭf/���>�����-����<��E�������X	:;�-��Ic��D�ts�� �al��P$f�$u:�m��z\��ϳ��*���ߘ�n�cg�jш�e������y\�=6Ǻ7���V�p�&%E�1�>o�UlÅt#
�$sپei��;k�plr��ܺ*��s���H���ҵ����z�h���b��اd"�2ZuL��<��O�T��Ɓg�i�Ȏ��%�j�pƃb�C�����6U�����z����Z�MPO�^���5��Y�n[<�����>I�.U��QB�ɕ�31���Ř!�+m93�oBcolm047�#�7]˶_�����q�zlDn 7��S��H��#b��X��X~�V���0��>�;���eY5I���zj�fE��^��C÷��YTۊ�k�[�r�U��~6�l�H�@1'��Ԩ�Ԓ��#ye�%)I��j���A֨��E;�GcG��.u
W���`��
�����NJǎ�A����:+/ܟ��2Mڒ9�n*+���g���AP?֙��M� l6"�p/��n���	P���c�ԉt��2���i�3�B�ص�����~�_1➌y�bň�<V����6�$_�l��2��m�fj���l��ckp�V�Ǚ�u���*-�Hn\�����g��\m=�*jm������=�KK����!=	�x��`53�!&����])]���OCYۧk@jcQ��0q�j�Qhj䧹��7}(��M��n��)1YQ���kd�'eM�,��{�����Kg-��`:n��u�X��,�<);6�+�@��M�C�F?Q�l���׬�"t���@T�*���O�b���ݾZ�UJ4��+�J[�'qe$�#�"d
m�c7l�"�\�dYs��;U]�)�a&��RC6[���T���n�N��L�$-�[���2j���U�sSZUF�&4��"O�P�w�����'��������J˿_}�$����n.���^\�����������]�H�W���//���n�U�/_�]^��ҋ����.o/v8�	��:��O�)i�x���-�{�{�=���������=�����e�[�ߗ�/~��c�>�kz�1:�q,����a�����nT�����"�>���\�Y��n�F�H�a��t<�D�!�#�s�-���(�|��1b�����2�1J�q�8-�:��Z���Ϗ��QZ����
m`,4y�)+h��$M1��P���z�\�u��z�y���#�d�`3��4�Flo�#|�
�M��#9ϼ�#�r�cʃc�Z;h~���a]�@�{���1;>�n.�?{}��aW`m�?	n��?cs/m�7\��T�y������%�!��-�6ǘ�/�z㸞�w�	��[����qJY�t���%�� ��f3�n_��0<�@rNKΞ�yb�BHLG���sѬ���|�&ְ�I�P���l�u�u�YW$P� ��1��d�ú�zf^�^���P��2�0˛�U hfqq/- �����}#ngݼU��?����'�;�7x�N�l��|���L˩1��14�v}�V�^�\�~������c敏��J����^_�Jo�]��?��|ysq{{�=󨷷s��������_˿�|A
���"g#��U��)��ك|���v��O\���}�F��Y��hm�gf(\=��{�on��^	Δ!T����!ܛ�`1�0+ s[�_$,v��0��sJD���r��໶	�Ə�M�������~�HZ�|�1��@��n�C���3�b�n�t��$DM ��	��9 �͞�W�$�#""6��P-B,⧅�[nF��FdCf���	��<�3[��;@Ȝ�����_\���G���w7��__����_�n/��A���'	Ώr�s��9v-v�/̼0�Cf5b��s������	9�4&��y*o��Z..��ϭË$���B�mU���=j�Z�ٝAD����yήtCR�
a�e���zG{ea,/yl �B4eo6�� �/�"�.�&� ��KdA�fV�ɎHĿ�3� "F%X��Ӵ�z-������[6�8�o��8����`1@g1��C�}'�,�f���� ��W�ߙ+>�\����@Z���}�����������/��<L~ <��P�W��;3"��:w�/�vR2w��������oo�����S���ͷ��͑O��n��J>մl8�*͒:Nw1��X��(LF> ��
<������6�"�]N�f�V4'��bS(��a�&� b� �`�bY���$��n���<��b�����lI�_`���=��cQI�Q�Y,����R���fl[�}3�$Ɋt�;,�t�8u��?���wC�[3�?����������_�أ��P�+�_Y��|��*�ڼN����K``6�-L���9�rI5��9Zl���:��HLX3�ʌ���c6��������E
y�V(�����A2�D4�6�A������l>V�cl��N;k�H�+���[A�h#Qڷ�L�"v�6Ғ�N��Q(�nt�P�`�-�io�k(��Lk����^��m�j�8����&�.R4��g�3Uh����<s�#5h�`UT�cQ4�F��[6�TՎmZ}ES����J������4M0遖���6�V�4�I�|��j���	M���P��O��_f#�*���h�0��������Җ&�'�=X)�pid��v�֨phDQ����zM�5V��ִw�M��]%Oz�[�?4l�Hr�3e�p���*�h�6�i��9����(��A��+�<�Ws��N$A�=E�9^�ؖH��J�"������+��jm)�L#��KB�>	-�yz�
��9��8�4Qw�tE�$Y��ѣ'�_����k*�O��0�{b�T�tE�% �>
�<�c�d�(�jt��'����RN�r��*7�"'���ɔ��]5f��LA�{4�4�8��b@���!W�Vú��$�B�U���L�t+��5�����&_�zP>�Cӡ�Ͱ\�L6���R�b3�2?f�?p������l�s�46���}ؙ�DSɌ��;��u'Uۧ�A���c��!C�yD��T$��:c ��Z�{����<��Y\�qAm�:�+%���r��ҩj�����6�>.=��n}���C�+Cj�rob���9DDæ��c8��4K<;�i�UNuR&}D���?��)�iH:�xc�U�v׀+��������<#�\5���J�N�O��Unۤ �k�3�x��\��^�x�kt}J>��a+����SuIb&A����|��$q��e��.-�\�m�VV�U� j�K~�1X�o�E���05`��E�|����ҙ��ܚ
�nV(�)�}�
��P�H(+�6��;+�;��68���EQ�g��y� ҃= �>��|>����40T�E[�gL��#AԲJ��G�yL
�C2�����`}�n@;J����p�O���f��%�]�0- �n	��y� yA2>^��gZN��Ϟă"��D��
�q�z�y���s��_��nõ��YYZ��@�1��`��s ݎ.1�7q(��a��4�#!j��|�xl�yAo`�Y�&֔�k��2οZ:�Z����y���L�.mm}fc��P�=�K�AP�<$A	������ǵ���q��F�	�t�3.���7?>�l�E�\�H�y��K��.�nl����8C�9��'��{� �i"V��Ŝ�#�����tM	�<)�!5N�������B��C�9s>�q1Wԡ�s��/!�����|��Kpz:�s���i;d皭���1��<�-7An#��T�K�o�L����Uy�ܕ�1x"]-��2+�C����G�;}8t��t]D��Yz��L ��*!V���d�n	�,e�����z0� ����=������]�{���CAﾡ�,D��g���r��������z�,y�bڣ�2�*���ɂ����ul(����w��sT�    � o����u ��y%��E3sYgْJ�r��|�����-�8�'�QCE���8�x��l@s X4�-M�Q�0°{�*�%���p9gQ�A,1p� Vu�sB���n2�஘㨠���b��<K�
{+���e�����+鶴�1+�DPc��0{
�ѳ�מ��`^�YA\ĳZ-Ùm ����f��9Z����g�6��e�:�����g�W^��ё��ВxMYsxA؟#���x�;狱���\@�S�R�[(��Pk��Q$�A�����5'���I�����8��G̞�BL	���C P�A�5�F�|ac5���:,ViBB�΃�r����p����T���2o �
nq��_�B�ޞ��7���k>dX[�.��1ylZ��vg����k��l��]�)d=%V�W@�9@�8�'�b`J�vN	��}��G1��B�&A
3+-�a�����ԓ�yhc��H�*5c�)�B��-��y���Qkvڌ����f��{�V��Ne&�U�� ^�en+7�Z���Tֲh稪�0�8$��,df���@�����^7��PeY����`Q�I��m�W��j�M���$�f&��, �}'���u�/g��L���V�W���"��'�#��7;Q�����} �i��w;q���G�����g,�"[���A��q}��}b��A����&��c�O�&�H �H[j�mI�c`��D;B+K?�}Д7��S(~Ά��W�J���9y����g�l�6�У��ol��$����b��{�GD�8[�"��ٓDa�l�\��������$0|%&��uz#�:n�����D���|u��L^��jD��U~���)V���O��j9��\B���"�=���(D�U�|R� C��# 	V�l�`�۱�<\��p2� �l��0o�	2`.t�ba�����vPIh�D�bT��쭠Pϡ0G�u��n�>0�m�6/��Gp6�����c���ȡ����?V�C�ꔚyf4r.˙�1QV��U�QV[X�\�@j\���(i�(�;�ș�Ȓ3e�u��CW��djdb�HcQ;��WeR��$ �F�yY5���8���U�D��)�*�3�0���FO�n�<:a���5n��2v�Nf1��t�&���*m�̎� ۝���脢N=)bT��A⑶����" QZ[�|H�ލ��j5���18:1��'f����U4�݄>� V_��X�ߐ&�R3����C��Cjf��NdJ������DP(Ơ��GI�5A!��ϳ�N0�N}��B�Q4$ݔ���	�QW�f�΋�Q{'.�z�V��>(�8�M�VXT{�	$��TZ��4��w�2��xrҏ���Iʸ��Z�vXq����N�O�\�NY���B����j��H��r�ʹ�P�R�č����'Dq�6R+���~�=��GN<8��!<X���*|�L���=�;y6f~բ��&E��D�p�z�N��a��ľ3����FU����xh+)���i~��Y��N<�a�WB��U\�(u:e�#c;�MIةf�x�7���x���]�ۇ5L�G�����܈9�h"{�	��걶S2��i�.��\��z���P�D'W�l74f �u���>t�$���A�j�_�Sӣ>�mW�Y�N8Y�de�;�厮�l��C'b=lݭ��R�0)�L���+��u��C�*M��D�f�+��l[-��mqd���J1Ǽ��1�+i�v��ZG]+�C�Z�eVP��z�QjS��>�kQ�� �^6J�w�Hٚ�@O�䠱�%aZ{^�V���kH��mXj4���B��M��2|��-�"D��wC4�q��:�#9�Z�Ƥ�0�'V��j��S{0��S}Ne�f��Me��5$��*�
E@y��j��a2�FGr<�c$��}#��'�����.��|���7��yZ���~:��'=-����=����K_&�S�4�I6�N�s��a�������6Z,�n�L�нMw��������䣏�w��ࢿ����٣tG0����~.~=m���֗G�tR��D	Bq}Y�g���-^�+K±��J�!ɕ��vξhZ�pxEx�ӎ�tF|���(�{�����!��όފv�`
`�))d� V��V帟�����½T�lΥ�Z ��y5a~�E5��r b"�4xq��ɽ*z�#��8�DLx�( ����� ~r)�!�hIq ��gVՄ�p#�-H�������O�H6� ���2�B�6�)a�J|$pV��R��</^��{\�H�r��#�9	M�չHc��9f\׆�Ѡ������5�_��m�Nt,h�������lBD��UK�$�MCqpz�~����K(`J��[�C��#�a� � [�D�6,�h�p�B�f�Q�l�X�k?<��A�)M�i�M����Hh �h /� F���.έ�"h��[��e/b�mf�� ��0��,��L�^ĺ�CQ��%�bh��:�w�
1��XxX�������:��_߼>��^ ��'���~~��Ƿ�<`��r1�QX�`�z�6 ]� Ij�$����NXP_��?��{�5D;�}�d���p]�|��vk~*.�\�.p�s��֎��+7�DE)ț"+��yJ%�`���|�f��5�q��;��w���m���.�v/�$��p��s�p;�<8eo��*�ŭu��ُ̞n7�W�/���zy$]=��/�W/.��]���{�әcc�Gx�����N��R��������<��"cL�;��	�5!.�
)���cϾ�)�)U 6~��h���	�e��8)Dدg�����G�`�q������F�ʻ)� �12����=
=v$BAG����& �E���6I)���;��"�) =�+��Q��)]r��Fc�cS�F��D��(8�`	Z��N�S�	<_c6�k6���;�����ݵ��Z�{�������X�*�P`�m�sE 6� �晟6��U(��%\MN�����\����sp)x��Č&��}+3Af�� 1�;���f����^��^|d�)H!��:���ɠJ�F�DJN�ttOvMz��7�/�vAwh��ll�f�<������%)q'�Щ	�
ݟV���ݼ�;{-�]�K�.��7gw�w��g���˻��f�|��* AlZ��*跶R�+�f�F�#@��CY@�Y�V6|�����
�3n�m�4��( �'��Ȳ�����H�?�wl�/0@��.{�M�$P;H�`Q������������x��0E9���4X��7��9�:i���ۅ�؟h1 a��5�����ryʀc��O�~M���8.�RԢ:�ٮ� �����R�0r��?@>=FuV,4H4�����|����ͭtvs�L�N,'ή��+�\n��̔������ȑ�;����~�o��Y�z�EEp�Ͻݩ|?������h#9�l�Ş�J�/\4�.�b�S2K-�Esr^�΋�_�dh�fo O����Ep���~�S�8���']�m�6�����������[�>B��;@2�+��I�vO��cu�Sf�|��|ئyO�d� .e�����g��7go��<��=؎�E�'_��9@8��T��!�N���w�)���Sz�j�n���J���R��|��͸�Ds8
�U]D��=��?H���Ɩl���I��=us��*����<�8��nO�تh����1>��j�­���t$�()	��5k��%�њ�nz��w��v�`(���1N�}��?ԝ[��w�P�Lٚ��O�Z� �2<#a�������n��f[�tY���a�Y��(_��ӻ->�=�G�#S��*@��XQ�e�њHT��S��г������H�?bM��n���(��j�J���I���SP�M������k�$ٮ�QSH�SW#o��f�c|$����$q�U��j����B��:�m�C^`    �6�Jv�H�'�XHR�̙����a�qY�A�HҘ(�j�WW������F�I��<�csB���A�bE�' Ie�⪧���^�ag�f����G@�j+SGt�麪��,��S�$:ř�;N�ێ�U��dY�á�������c�Nُi;YI�HM�zԓ>��6-��.M�j���pH��-a�D�U6�L��4���Fө�����S�HҠjA_fC���1�p۠؃$�j��y��\Y��Y����2vOI���4�d��Ǝ�8R��� IS`�u�	M�OI2�Z���<=�KBQ�o0�4hJ�F���{���(Q��,�������Z��
��PHR��T8$�H��]\��c�A��BW��[2�r�?sRC֪�y`a�@�=?�=�t�ih(��$�������J�<�����+��C1IY��AdFz\dI�6v���&�M��,�M�X���ڴ"c�r &	'8���Ը ֤t��=L�h�}>����^�)��sp����c�r"��]ۜ&4���lg�$��5EAT�Y�n74�����"�u��ЦQ��7&Y��\	[�R�J�}HR:�~���j=EQX��lh��»s0$ɲB���7I��4H��C�H��8�հ.��C��Oڔy�
��pH�X6z�%��U�˖�^�I��Ǟ*S%���en��$4|H��h���I�q�k���I2]0+i�>�?��9lꈳG@�&?E�;29e�i�^w�3�!I��W^&ˊ_4F�SA������`HRP�}R�I�8lEhf�W�$i0��2�*p��t��cC���t�\fY�H���
��#���
Z��8�5"���l�����|��ߪ�Ӈ%}:$�2�|	�|!F�rq�Sw{������g͙U5�V6G��^|��9$=8�i>���Fm3Ҩh~��:)sq�,+�a겳�^<�q�HKyL�zV��hN�N��C��#���	�"���	��BO��~F$�">x����Ĥ��X{�{\{�j��'>�`�b![޶Ї�W5��1)if�Ƀ��Gu����#۾�@��s|ё�W�� �Z��o��RH��/̷������ן�oD�	�룹�G;��î�D��}m�{�M@��23W/x�g@B�D��b!6ǿf�~�����e��e����Hʇx�x�L�RRu��	���eG[�+��H�D�G���LmiB�*P��oMc#B���`�[D,6/W�8���p�&\ن?L��eF���y�ñ���!�����ӻwF���o���۸M:�^�K�m�P2~����-����{MR w��V �#��E�����e�F��_����p<�t�\}Mf��[6QL�� �f|+]�q��[��{�㬝����������K���%��x����7��۷�//nOf��kK�xw$�cN�߱͡Q�ّtU��q�a1��5�YAs"��^�z�a� �y��:�WТ+�؀�_��_������7�+����y���F���-s�o�O>�څg2�b|��;�Z}��HGv	fO|M��hU��C�����ﮮ߿�8y����N�~����C������]�\�L����&ۆ���HrC��/�ޝ]=�/{�W��^^�]�\]ܱ�\]]pa���+�;��]��^���8{��󃲼�����^�\�������墄�7�//����sq9+������m��8D�7�� ����W�����\^�ޝ�~͵1�݀G���Y{��������Z�]}�ĵ� �ڛw�w�@W�	�-�:{�^�o�;x˼�|�Z�}��w�I����˫�K�ޝ�Ҡ���^��������j~>{��g�/����g�}w����-���������J~q{w�[��gSW�owP��[V�7�w�~�WPֹ��{ZZ�V���:��9��}qqs�����]�17+�Յx��!���b�|qs������W;�#}}������͏l�]\H��`;�b��za��y�R���_ܝ]�����n��l+���!�B޲�QY�1#y����wo�=o������⟽��~���93#V��ag��`T��n�oX���|κ������ٻ[�ϋpp�����7׬�Y/nX���̞�n��K�x�C�Υ�<����p}�L~v��^t�&K�g?B/�B����e�?��Ӊ��gҘ�݁C���>�c���34���k�y)��6b)�s�f�t�-m��V���EB���9�&���t��O����o6��>�V�<���|�%�n�c�Xa>�N5�:�i�$>����w������3�^!�B���L�Ǽ	 �Fing������\)��l}��Eu�#��h~B-�P$�І�lǻ����L��:�ǔ�Ϻ�{	 �e��f�]��6/��`g*�x�d��![�A����Tz��D:�>�Y"a�iV�cE=���ҬX���ygkna+~GI99h�feJ�<�y�,�W��P{5
��Q��:D���э�9v^�:J�0�ތ]�uد�D�h�8*��1�1�k�����T<y��۽��i�s�MM�9��Uc�N�Z��4�Q��yٶ1b[��D#	>F�R�e�Wz.�~�Ʀc��R��4��~�x�i��V��T�'0M�.5B�/�|+QP��~u�A�}k���P��}o���~
Ӏ�>��\���Q�Z=Ջ@O񡘆�V}�T&.6��VQ�~�P��'�jk��R�̡��i�ᘆ)i�v�V#yk8��5��,��Q��v���fg`ŵ��}�8��7�V�FM��	Ǫ�J�����t"�mNEi�J_tUܕ�����C#��ihq��� bkI{S��#������ �z�ZYre�����D����#y�pl�$�h��
��	-J�&7T�FF��+�#��h�Xa/��X��Y�)��� Һ�`Ϋ#���#w�Tץ+5��\��Xc�bfX�Յ������D:!�����
WL�@��k3=E��j$��7��R�t44*�m�54Q9qF�����q��į�
w�`�m������^W���ѐ�A�������P���&#�pI�I�9A唖�Y�>���}������B��e�(�k��C��ךQE2�
�4f�N�jtH�f\�]`�^��� �Qj�Q���$x�jp�$V��T2r���&�8U��J��i��4uf��4�{S��Z�@8W[�B�T�����AsO�]<��M'���zg���=������F?�q4͑�&�����&�8Ω��c����e�H���a�]��P_�sT�N'���L��&I�Se��k���"��Zg��q��P�ơk3��V2��ںӢ�+�Se��y���VQ�791��v�j\C�(ӕ�yTylYj�fFZ���J��I>c�e�UQC�:ʓNՔ5C>T���1�� w�iH�-�M?Uv]rn;#�3�Gn��<'��W��P��V�hE�x��t��i�O�]�l3��o��Ɏm������_��S��2���rs�DQ�zB9:��'����l�o� ���^�;���VmM���OG�E�wkЅ��rL46�kd�z�c+�t�u����J�GbS����:���A4�P�@��1�u\˰�U4ָ�c��faE���
xN58S`4l�2QD\��H45+��U�� YX�7f��=V4�b��� ��Q��MךY76I9��VM��o{(�*�V�BVà�2�u��5 Y��!�mT�R�6oU3��x����(�3���$U0����p5Ƕ�I����ɦ�Ur��M��re<�ֹ,j��i�<��e�N�+���R�U���Y��S�H7z��ۑ6�����|�T�ΥJ��4���)%>[�hm�?9�=�P�P��
%x��@kV����aX����]�AEj:���a0�ټ����c���>�*�p�/D >�i��� ����~�*u�)�8���`<�s���d�A�����
��{�s/��q���W	@��g<�?�wp񠏜������1����ۅ�]���� m����MV���w�*u�8�_8��� ��.���S3h�?lf�� M  T=Ĩ>�Tq?]��r���J��A���p����D>k�b\(�D�pB��7Z�H4�cp�J[�U�m�>��҅`�?�t���BQ��RP�.)�" ��:�zo����7�+ �i���-n,0V�9-BL �"a.�ʖ����@ȅd�9���j�ŹRh�p  kX�3܆vv{��D=�F轈�v�-a ITt)�5)KhU� � ���.-�t�}�ͼ@y�Qe�xt��s
,�bE�F4�յ���������W�9Ҝ���gf�gv�,k9ES����Dz��o�Q��<�B�߅f	H�8��˓����>^��+r�E@�Y/�o�p,?���a�a)��(=f�����/�����:x&�`?�����8��_����������*����E����O��c��� �&�aV�m
7fpC?]\�����Q��t��	5�-	x�O��m���7�]��d�	�\9'\��R��ۻ���~1�n޽��s���r�=ې�m� �,���� �0�6B~�K/��˖��y��b��=pwz�Ѯ���ʺ�x�l	Ŧs!�VY\h���ʝ����2�pb���؋�v��
�U)WD�:�;����]jSޟ�a��U�a�1[��3me.���+��f�u�����<����{�������9�RP�t�	ޱs��'��tٞU|aϽ��ue�D�w��Y�/`�ɱ��!�W�3)'��
����o��ڭ�Bk	x��S���<x�XEH�S��t����/�P�)�U��*�<M��sY)v�El�t� �$V�'''���Y��<�-�q���Q�9�������͌���$ݾ@�v�a���=K��Dvi��r��7�ް�h�K���c銱�c������=�=3.�
��4q9OW��]�Y�Igڞ��Gr"p�k1eҪƱi��3$������������k	���Oώ����W���ߙ_����_��?���`��/��z��<�^^���.����xb�1x�� �=��H� �n�N���p,]���X]��\�&S1�"��+�HyN�"�s���h�8�XWl��Eƅ9��Ϭ�����nQ��t�s�-ڔ������7���t�:Ihg�*r�J�f�K�s��li�Uα���c���+��:����L�P�����Z��"�
E����	3R��< �9�i�6�ִ�|�9�(_e���2M�����'-K�V�w�Axz�V��Ӕ)�U5�m7��U�'#�x���'�,��Tj?Pv$�����^wm]�1�Vի����!<�A��J�"�.���rS�A��8��T+��R��.L�N7���3�����؊�$��B�
Umug������+�V�Q0tE;(��)�g�[�nH��������ˊr8kU��1�~:v�f��h�c�
�d(���F+w�T�2[���(�=�i�9�A9�FfԔ��>��k��ͪ)���7�N�t�Nh�C�M̌-q6�u������Z�F��o�i29��U&���VM��m�����Z�9�k�va�8}��Ꙛ8M�Rm�,�e�&�p�J7"--�xF���Muܠ��&�hZ����LU�w+�bV�,��F�;x���7�C��ڑKlG�:FD��)����N�u��YB��c%W���W�qVyf����N/�ȏ�ni\}X�U��C�Jd���"�TK6�F�a��>Z#��I�.�
���J*�p�x��'@kؕK+MV��ף$h����5�Fn ��M��4p<UJQۓ��G��F�R%i��A�e��s�a��'�������m	���SpW���@��&֪��T۽�30�?3` �>о�>����8v�8��j�++��f�a|����-'u<o�XoR��ybEGn͓E��k���pi�F��U|}��g>/kmtAgvcD�][*wϨ�\j�Y�4��A\Tv`_8�-f\����]����	�b�H�Ω5�v�Ɯ'�Y�6� Aǂ爭Sj6]A�Ek=�4��x�=�fo�mN��^�sGf�8%��cUE���f�S�m\���G������*ǋf�Eg�/�Օ�pkv|�o�q'7�^�Zn\-y��q�I�Ek&k�}�6�@#=*�\�+���
|�.WAn�#�"��F:	�Ԥ37ML�7
��,�8,�&l�d,m��u;W��/��HI�o�������8����Wu�:��D�E�MO��DO��b�*zv��|�2HE���4?�j1��oގ�[�h�(��,�����m%���h���m�����Βf��;�|�K� x�gɉ\�1@e��P�s�a�A0'J^��Ut����C!TErA6D��k:�o@F���q��h��,]�B���JQ3���0�"�n!��S��?m:/�9OdڣܐXgz�gt�A����	{�|�EX�	��lp�x�vx���B7���]�շR̄,��SI_9�)*
ap�,Ԓ�T0|�	b��M� ������He���H�"�y��)z*�弟
��!(�����pԨ����v,��9 ��� �%@z̀��������$������W��0F4a�6�ٔ�N9jY��j�0~YW ����w�4�J%k)E�pb;�[�]�&a|"�������N��c�T*�_6�l��M�"g9�k����e��2Bv#��*��М"o�zX'ZƳ��<�'����%�x&���Tx�)T� �Ky���� �$�J���}���W��C�!�ҽn~�:������D*��?�`�큊:�ܿɦ������7�m�56�8[�m���R�ῐ��<�w�s�-�k�e
9{1����r�13�q
ư�B�(��/�?��T>O�<�D��&^?�߭�aA��>%6�^����o/�'S�/�����$m��<ė9���0G����_�霰_�`�+�}^����&%��d`I�8�f����g�Z"�/�[�>}�S�X��xmG�6?�K����7�LV)T�b���vx\����"a3�NAS���?��nނ;��͗[�jy�}��|=��iY�y��'��6�So׾�r�'��g_�ggg���!      _   c   x����E1�b������z��ױd$���B�X�l-Ns��ç�|�����ȅK�x�/y�-|�����#C�J�RJ=�����T��%Ke~�?�\�      `   T  x�-���� �P�>,H�^��:V������/�T�^M��Z]~V{��u�����.��?����z\����o���l��O�շWo���7�F���x�i\���A?��z��ٮ�����@��\C���Y�ʭB�3\��/5�T,K�R��8�\�����*aA�����_l��ˊeq�"�"�"\#=�KЕ�aJG&�Wb����,Z�_�ΐQTfQFeu�9�Ce�>F�ۋ�'w#T8���J�J��m��o�+a+a+a���ENC�."70's%s��<13e��!(C01/��L�8ya�,�P�
�%q*N6�{��2x��O��{�xm      b   O  x�-�K��0��a�P��.��9����zc{l�������<��Y��9�7��V�f���91N��D����4�l�M� ���l�l�l�l�l�a&rF�g"���v!��>;��͕͕͕͕͕�uU����.D�/fd��̬����
Y�B4B��Ō��^?`��(o�7�o��������O��?�`q��������|�lp���A��I���`�L����*��>&EM�x�lp���A�w�Q9�� }6����&}���W%�!q~�,����.]֥�T�jT�n��tC]��w��ߟ���7|�$�VqZ�q�UXqbőU�,�쵪^լ�U{��w��ww�]w��uw�]�&�&�1�D`0�&X`�S_eUW�ȧi?DADC�68�'V���	�������U�R�-�(�#��n=�z��p+a*a*a*a*a*a*a*a*�މ�}��í�[����|��II�k��d/�ޔ�*{W�$nI�ݔ�Uْ�b�b�N�N�N�N�N��p���m��Ӄ��,����.��Ut�C��0����Q%�[��~��?M�      c     x��R1n�0��W�1H���nA�!Hm�.����Uӑ�"ԁ>ܑ��z�.��uާ \N�~&(�>'%( ��v�S T���5 .�.�����&��3D5 c��4 �ڶl�9�AC��k�ssK	�!&7���S���eC�!�"�ų��<z_�������1~��{�8��b!D*5ML�/�y �������z ���I� �T�>�ɣN	�ZU)g�H*U]T������	1���s�'�C8��]���!=\: ��8��      e   b   x���A�̪��s���X�<���)����{jxi�Vi{��:>�����i"�M�0�B1��,���"GԵ^�ӊ����]��oo�2��l�N�<      f   �  x�-�ɕ�8�U��+��/�;��I�)�'����Ƭ�j��ƭ�j� 3Hr�� ;H򃂠"�,�,�,�,�,�$9?I$ �$����|0@5�bP1�w|�ƭQd�Az�W�H��3 *� $�bR1����j[V5Y�%��c}��ZĢ�b^��,-���	6�M�Ʒ�۰���E�a�l�f�6K�o��!ެeþa߰o�7L�����r��ٟڢS�����Y���a��phphphp�-���ﭙ_��e��Gu����y��]�{�����6@�!p�$���c��5.��Ԝ�������1�G��c}�샵J����Rq�U��Z�|k�%��#�S�L�4Z� ͙�Ns��[�����&F������\��	[Np�z��z��l�ex2>�O�3�-��9{��+��z�
�e�Wx��%Q���<��N���m���W~�bpP���zx<�)���>�z^���&�d�ʞ�h*2S�餧���N':ݶ�Qx���gV��洹m����6E�"P� R�۪,�fL��Q�1ʣ[>�ս)mf���/v�TǍDo��(���zjE(�F�"A���(���d`6�gS�]��צVv>�p�%H_u4�'���������I��z�F�K���������U�|BQ��^f�����ߌ.�T��)s�����>��O�\ ��46�f�jh&��y*��3���
TP���:��P�C��
�*P�@����S����=W|������T2"�|�J?��W������
R*H��N��Aq*<^_ٮ9Ϝ�� *�p֜<��?�����]J�'��Tx
�����5O�c�Ym*6X�;�<�3�ʰ��`_���eH�*�����pe&��b�%��@l��:ԅ��(X�CM�M�-�¥��A�0L
ӴL��[����D��?��\��҉�i��3,�[�J��JKy}1�3���������v[      g     x�UP�n�@<�~E~��	�#�B_�*�=��7�H6h�_�� *zό=�5lQI[*���o٫�t$�-�߶BV���Xɏp�,J��^�Ac���K5��]�)�aF��xo��r�/|l�;���bW�(�ᩣ*��!v�r餱T�%�>�����5$�K�@M�)�Y���n�ԉMf5;ٓғ�]�z)�RF���h����b�p�ɰ8sC�}U��K�Vb/�1֎�����^S�5��E,�6M�W�5�'�cgj�����~�+�~?3��      i     x�m��r�0�׹O�%�4v~K�.	I�)M�:�,�ȲB��R����Aw�`�{��<�%<Q�����������`2��]���D����>��/��E�hÌ�1VMqA��"�y��v��SM���.ԁ!�+�2���;!ת��޲��х{A�Jc�
'Ko�݃�l�<`q-;�)��<���EX[y;z�čK����9�zy�����||��6�=������g��.�@c��Ԙ�r��
�2�_A�4�M��ZUz�ݡא�2c=�<#Xf!^y;o��� ��~n�dPG��=Ն,9�h(���gPY�qN&���h�ytw�F"�@�t�W�7��l)�9@J�y�_S�w��un�޸Jys����i��tm+sDn�Y'F��Dk��� *�&p	_p����J���A͈)�g�FR8���p�-7wH^�b�]Ü�Unv����s贠��3���j�H̳�ч�Y(F�bę��|�*M����J��Һ'��ua�n��JQn��f�c��|� �/ER�:      k      x������ � �      m   U   x����  �7Na�(*��D?&�_?���wE� ej�i�dJ���}�گ_�n"�9�V���fޘ�ذ>�u��B�B-\      o   �  x�M�KS�8�׭_���r+���0u��j�f��"� [)I�~�ف�*��G��ӟ���ߤa	���XJW2��֞�Q,��`�>y�לV�+h�a%=�kg����-��m�jz��_��㉉9=I|ip��I�ɄV��p9���v�ɠg&2��Μ��i��L��ԝT�A�)&��~���(�ͮ�W-]�� x&j��n0r�+��%M8�D�Z����<KZ�C���������eWJ+�A�q6ȃ��,���t`I�üGl���hIA�_ֵ�/KJ���+�}�wFz�z�)�Դ��������Kc��r9�x�|KS�K[�u,����%9m7�,-h�~G%=�Tϟ�3-K+�+�鱻�����n�0�.�èKؙ@�oX��O<���ȲX��|��A.k��#h���翣΢ݰ��8��p���H�_�!��Y:*�ִ�~�E�9���V,��M8�KO6�)Oik���ԯX�ѝu�9�=[i�_��ʝ����T����ⰼ����s���TQx*�q�Q�(n��@��[A���=+��B� �.�x�WX�ѕ�C�/�aEN�N��wv�[��ye�����;+J��g&�PT����$+jZx}ԳrN�0�W�JHq<�c��d��ʔ�kV�Ӱ��iշKs�3�]�W-�K�,�|��%��[dTV�^/��5]ƨ��1��N�	���_��cg�o�q)魄q+D�{���<�@�A�6�W� N���Q�K�,P��觵��Au��UI�	W�0���UUG�e`�<�O�b���B�X�N�,רN��<�d��P�NB��<ܨ�a�PΟ��5���u u�n$Y]ѝ�$�kT��.R��]w}��R3�yB��$�#0�gQ��
�4� sXk�?s��`�-~Jz�x �b7�=�)�5=������]6���vPws<{��v�w��\4����}<u�s6��>Ll���l��c�0��>Ǧ �ݧ��S��Jb��p��-�]�4~I��q2��m[�GW�HU�D���f>"���g��6N�H��;�U�� M��#���t�����A�h��k���`�s�ݝp3F�4��l/�T���F�.�6�j@�Z���}����(���������M��N~��x�>�ry,ߛ�Ȍ��>�V1�8�������ac      q   �  x���[o�F���_a�O!�3{'����Rm)�v��^-�ԥ�"J*�߳J\4E� �aɝ����Y�2�\�29�hs��=*�,(c�͂ݚEX6�`?�-MUn������3�%`Dɍ��]���*�2
K4��z�}��9t���(�D0/'�Ā@��!� P�,zgQz4�<b$�k���62 ��*J꣌J`@b��4������;���eH��s�/@�(JF�!{�Ǘ��r��ϙ�1�D��(��
Y�fYl�w�z�����緳����RIM�I$�h5+��ZY&�82��r�Y�D�m�8ׄ��Њc8�(�ID�J>F\T2M!Q@�IO+�6I�*)�UV�SH�dZ$O�OAmY�v����ڶ-�v����y��սX�H���޳��q�<�����m����ls�(�i�7��+�^��ݏ��!��)M�l�v{h��5'�%���[�>�,�;tմ��O#�T�f�z�]$F����c]���޼����Մ�o^�.W�z>�4y�z�w�����r��o���^��{5s��lp��^�����.����09]���8��������׏���~u=���p���c�����$��n�ۯӳ�'=,E'vNǒa����[�ny���E�x�t�^���R��(�L¼����=b�[�A�)%�"�zv�H�7�>��� y:OG��Y*R�!�G�;M�=���(vv���t:� V[W      r   z   x�����0�s���X��٥;r����?H i��;�T�����-��+j�b��7c�rlr,8֍t�=�9��[���)�c�9�cgcw��� y3��uK>H)�����,9�پ���y���     