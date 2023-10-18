--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bouquets; Type: TABLE; Schema: public; Owner: yongxialee
--

CREATE TABLE public.bouquets (
    id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    currency text,
    description text NOT NULL,
    image text NOT NULL
);


ALTER TABLE public.bouquets OWNER TO yongxialee;

--
-- Name: bouquets_id_seq; Type: SEQUENCE; Schema: public; Owner: yongxialee
--

CREATE SEQUENCE public.bouquets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bouquets_id_seq OWNER TO yongxialee;

--
-- Name: bouquets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yongxialee
--

ALTER SEQUENCE public.bouquets_id_seq OWNED BY public.bouquets.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: yongxialee
--

CREATE TABLE public.transactions (
    transactions_id integer NOT NULL,
    user_id character varying(25),
    bouquet_id integer,
    quantity integer NOT NULL,
    total_price integer NOT NULL
);


ALTER TABLE public.transactions OWNER TO yongxialee;

--
-- Name: transactions_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: yongxialee
--

CREATE SEQUENCE public.transactions_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_transactions_id_seq OWNER TO yongxialee;

--
-- Name: transactions_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yongxialee
--

ALTER SEQUENCE public.transactions_transactions_id_seq OWNED BY public.transactions.transactions_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: yongxialee
--

CREATE TABLE public.users (
    username character varying(25) NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_check CHECK ((POSITION(('@'::text) IN (email)) > 1))
);


ALTER TABLE public.users OWNER TO yongxialee;

--
-- Name: bouquets id; Type: DEFAULT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.bouquets ALTER COLUMN id SET DEFAULT nextval('public.bouquets_id_seq'::regclass);


--
-- Name: transactions transactions_id; Type: DEFAULT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transactions_id SET DEFAULT nextval('public.transactions_transactions_id_seq'::regclass);


--
-- Data for Name: bouquets; Type: TABLE DATA; Schema: public; Owner: yongxialee
--

COPY public.bouquets (id, name, price, currency, description, image) FROM stdin;
1	love is kind	7500	USD	Love is patient, love is kind. It does not envy, it does not boast, it is not proud.	/products/loveIsKind.jpeg
2	lavender dreams	5500	USD	A mixed arrangement of fragrant roses and sweet smelling stocks.	/products/lavender.jpeg
3	dozen of roses	12500	USD	Rose is not just a flower ,a symbol of love, beauty, and elegance that transcends time.	/products/rose.jpeg
4	happiness	10000	USD	A beautiful arrangement of fresh mixed blooms, arranged in a low compact design.	/products/happiness.jpeg
5	rose and tulips	7500	USD	A beautiful bubble bowl arrangement filled with fun and joy-filled color.	/products/rose-and-tulips.jpeg
6	saturday	5500	USD	If you’re going to rise, you might as well shine!	/products/saturday.jpeg
7	summer	5000	USD	The perfect blooms for a summer picnic.	/products/summer.jpeg
8	ballons	1000	USD	What a surprise! Balloons for the Birthday party/Celebrate	/products/balloons.jpeg
9	bear	3500	USD	You are the cutest bear	/products/bear.jpeg
10	chocolate basket	4500	USD	celebrate with chocolate	/products/chocolate.jpeg
11	white and purple	5000	USD	This is all you need	/products/purple.jpeg
12	colorful mix	7500	USD	colordul mix arrangment is shining your day	/products/colorful.jpeg
13	love	5700	USD	love is love	/products/love.jpeg
14	get well	4500	USD	wish you get better soon	/products/getwell.jpeg
15	single sunflower	1500	USD	You are special	/products/sunflower.jpeg
16	get well 2	5500	USD	think of you	/products/getwell2.jpeg
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: yongxialee
--

COPY public.transactions (transactions_id, user_id, bouquet_id, quantity, total_price) FROM stdin;
1	testuser	1	1	7500
2	testadmin	1	1	7500
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yongxialee
--

COPY public.users (username, password, first_name, last_name, email, is_admin) FROM stdin;
testuser	$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q	Test	User	joel@joelburton.com	f
testadmin	$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q	Test	Admin!	joel@joelburton.com	t
chickenlady	$2b$12$Q1DOH0P.zokmfg7o5wp.LOcTkQ/NP8ShSk2Rh9yp.grfPq0DwQza6	yongxialee	leelianou	dejnaj@hotmail.com	f
happy	$2b$12$7xi8VGDa1nnFPo9xGW68iuyO5KO5c5ra0ZrvP3cs/jjWSnToxxtu6	happy	lee	dejnaj@hotmail.com	f
\.


--
-- Name: bouquets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yongxialee
--

SELECT pg_catalog.setval('public.bouquets_id_seq', 16, true);


--
-- Name: transactions_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yongxialee
--

SELECT pg_catalog.setval('public.transactions_transactions_id_seq', 2, true);


--
-- Name: bouquets bouquets_pkey; Type: CONSTRAINT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.bouquets
    ADD CONSTRAINT bouquets_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transactions_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: transactions transactions_bouquet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_bouquet_id_fkey FOREIGN KEY (bouquet_id) REFERENCES public.bouquets(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yongxialee
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(username) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

