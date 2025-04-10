--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2025-04-10 12:12:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO root;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 845 (class 1247 OID 16474)
-- Name: Analyze_Jornul_Type; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Analyze_Jornul_Type" AS ENUM (
    'ACTIV',
    'RETRO'
);


ALTER TYPE public."Analyze_Jornul_Type" OWNER TO root;

--
-- TOC entry 848 (class 1247 OID 16480)
-- Name: Role; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'CLIENT',
    'DOCTOR'
);


ALTER TYPE public."Role" OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16487)
-- Name: FileS3; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."FileS3" (
    id integer NOT NULL,
    name text NOT NULL,
    "uploaderId" integer NOT NULL,
    "uploadedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    description text,
    "mimeType" text NOT NULL
);


ALTER TABLE public."FileS3" OWNER TO root;

--
-- TOC entry 215 (class 1259 OID 16494)
-- Name: FileS3_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."FileS3_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FileS3_id_seq" OWNER TO root;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 215
-- Name: FileS3_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."FileS3_id_seq" OWNED BY public."FileS3".id;


--
-- TOC entry 216 (class 1259 OID 16495)
-- Name: Informatii_Categorie_Boala; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Informatii_Categorie_Boala" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    "imageId" integer
);


ALTER TABLE public."Informatii_Categorie_Boala" OWNER TO root;

--
-- TOC entry 217 (class 1259 OID 16500)
-- Name: Informatii_Categorie_Boala_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Informatii_Categorie_Boala_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Informatii_Categorie_Boala_id_seq" OWNER TO root;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 217
-- Name: Informatii_Categorie_Boala_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Informatii_Categorie_Boala_id_seq" OWNED BY public."Informatii_Categorie_Boala".id;


--
-- TOC entry 218 (class 1259 OID 16501)
-- Name: Personal_Data; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Personal_Data" (
    id integer NOT NULL,
    cnp character varying(13) NOT NULL,
    "firstName" character varying(40) NOT NULL,
    "lastName" character varying(40) NOT NULL,
    address character varying(200) NOT NULL,
    "phoneNumber" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Personal_Data" OWNER TO root;

--
-- TOC entry 219 (class 1259 OID 16508)
-- Name: Personal_Data_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Personal_Data_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Personal_Data_id_seq" OWNER TO root;

--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 219
-- Name: Personal_Data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Personal_Data_id_seq" OWNED BY public."Personal_Data".id;


--
-- TOC entry 220 (class 1259 OID 16509)
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'CLIENT'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO root;

--
-- TOC entry 221 (class 1259 OID 16516)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO root;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 221
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 222 (class 1259 OID 16517)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- TOC entry 3224 (class 2604 OID 16524)
-- Name: FileS3 id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."FileS3" ALTER COLUMN id SET DEFAULT nextval('public."FileS3_id_seq"'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16525)
-- Name: Informatii_Categorie_Boala id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Informatii_Categorie_Boala" ALTER COLUMN id SET DEFAULT nextval('public."Informatii_Categorie_Boala_id_seq"'::regclass);


--
-- TOC entry 3228 (class 2604 OID 16526)
-- Name: Personal_Data id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Personal_Data" ALTER COLUMN id SET DEFAULT nextval('public."Personal_Data_id_seq"'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16527)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3396 (class 0 OID 16487)
-- Dependencies: 214
-- Data for Name: FileS3; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."FileS3" (id, name, "uploaderId", "uploadedAt", "isDeleted", description, "mimeType") FROM stdin;
1	info_boli_cardio.jpg	1	2024-12-07 15:53:33.27	f	imagine boala cardio	image/jpg
2	info_boli_renale.jpg	1	2024-12-07 15:59:02.268	f	imagine boala renala	image/jpg
3	info_boli_metabolice.jpg	1	2024-12-07 15:59:02.286	f	imagine boala metabolica	image/jpg
4	info_boli_dermatologic.jpg	1	2024-12-07 15:59:02.292	f	imagine boala dermatologica	image/jpg
\.


--
-- TOC entry 3398 (class 0 OID 16495)
-- Dependencies: 216
-- Data for Name: Informatii_Categorie_Boala; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Informatii_Categorie_Boala" (id, name, description, content, "imageId") FROM stdin;
2	Boli renale	Bolile renale afectează funcționarea rinichilor, organe esențiale pentru filtrarea sângelui, eliminarea toxinelor și menținerea echilibrului hidroelectrolitic. În stadii avansate, aceste afecțiuni pot duce la insuficiență renală, necesitând dializă sau transplant.	**Bolile renale** afectează funcționarea rinichilor, organe esențiale pentru filtrarea sângelui, eliminarea toxinelor și menținerea echilibrului hidroelectrolitic. În stadii avansate, aceste afecțiuni pot duce la insuficiență renală, necesitând dializă sau transplant.\r\n#### Tipuri de boli renale\r\n- Boala cronică de rinichi (BCR) - Afectează progresiv funcția renală, deseori fiind asimptomatică în stadii incipiente.\r\n- Insuficiența renală acută - Pierderea bruscă a funcției renale, cauzată de traume, infecții sau deshidratare severă.\r\n- Nefropatia diabetică - O complicație a diabetului, caracterizată prin deteriorarea rinichilor.\r\n- Glomerulonefrita - Inflamația glomerulilor, unități funcționale ale rinichilor.\r\n- Pielonefrita - Infecție bacteriană a rinichilor, de obicei provocată de infecții urinare netratate.\r\n- Boala polichistică renală - Afecțiune genetică în care în rinichi se dezvoltă multiple chisturi.\r\n###SPACING2###\r\n\r\n#### Cauze ale bolilor renale\r\n- Boli sistemice - Diabet zaharat, Hipertensiune arterială.\r\n- Factori genetici - Predispoziția genetică pentru boli precum boala polichistică renală.\r\n- Infecții și inflamații - Infecțiile tractului urinar care urcă la rinichi sau glomerulonefritele.\r\n- Toxine și medicamente - Utilizarea excesivă a antiinflamatoarelor, intoxicațiile chimice.\r\n- Deshidratare severa - Lipsa lichidelor poate duce la insuficiență renală acută.\r\n###SPACING2###\r\n\r\n#### Diagnostic\r\nDiagnosticul bolilor renale implică diverse teste și investigații pentru a evalua funcția renală:\r\n- Teste de laborator - Creatinină serică și uree pentru evaluarea funcției renale. Analiza urinei pentru detectarea proteinelor, sângelui sau infecțiilor.\r\n- Imagistică medicală - Ecografie renală pentru evaluarea structurii rinichilor.Tomografie computerizată (CT) sau Rezonanță magnetică (RMN) pentru investigații detaliate.\r\n- Biopsia renală - Prelevarea unui fragment de țesut renal pentru analiza microscopică, utilizată în cazuri complexe.\r\n###SPACING2###\r\n\r\n#### Tratament\r\nTratamentul variază în funcție de tipul și severitatea bolii renale:\r\n- Antihipertensive pentru controlul tensiunii arteriale.\r\n- Diuretice pentru reducerea retenției de lichide.\r\n- Antibiotice în cazul infecțiilor.\r\n- Dializă - În caz de insuficiență renală avansată, dializa înlocuiește funcția rinichilor.\r\n- Transplant renal - Opțiunea definitivă pentru insuficiența renală terminală.\r\n- Modificări ale stilului de viață - Adoptarea unei diete sărace în sare, proteine și potasiu, în funcție de recomandările medicului.\r\n###SPACING2### \r\n\r\n#### Prevenție\r\nMăsurile preventive pot reduce riscul de apariție sau progresie a bolilor renale:\r\n- Menținerea tensiunii arteriale sub control - Monitorizarea regulată și tratamentul hipertensiunii.\r\n- Gestionarea diabetului - Controlul glicemiei pentru a preveni nefropatia diabetică.\r\n- Hidratarea corespunzătoare - Consumul adecvat de apă pentru a susține funcția renală.\r\n- Evitarea medicamentelor nefrotoxice - Evitarea medicamentelor nefrotoxice\r\n- Dieta sănătoasă - Reducerea consumului de sare, proteine animale și alimente procesate.\r\n- Renunțarea la fumat - Fumatul afectează fluxul sanguin către rinichi și accelerează deteriorarea renală.\r\n\r\n###SPACING2###\r\nBolile renale sunt afecțiuni grave, dar prevenția și diagnosticarea precoce pot încetini progresia acestora. Prin adoptarea unui stil de viață sănătos și monitorizarea regulată a funcției renale, riscurile pot fi considerabil reduse, menținând sănătatea rinichilor și a organismului în ansamblu.	2
3	Boli metabolice	Bolile metabolice reprezintă un grup de afecțiuni caracterizate prin perturbări ale proceselor metabolice care afectează utilizarea energiei, metabolizarea carbohidraților, grăsimilor sau proteinelor. Diabetul zaharat este cea mai frecventă boală metabolică, având un impact major asupra sănătății globale.	**Bolile metabolice** reprezintă un grup de afecțiuni caracterizate prin perturbări ale proceselor metabolice care afectează utilizarea energiei, metabolizarea carbohidraților, grăsimilor sau proteinelor. Diabetul zaharat este cea mai frecventă boală metabolică, având un impact major asupra sănătății globale.\r\n#### Tipuri de boli metabolice\r\n- Diabetul zaharat - Diabet de tip 1: Afecțiune autoimună în care organismul distruge celulele producătoare de insulină din pancreas. Diabet de tip 2: Se caracterizează prin rezistență la insulină și este strâns legat de obezitate și stilul de viata. Diabet gestațional: Apare în timpul sarcinii și dispare, de obicei, după naștere, dar crește riscul de diabet de tip 2 mai tarziu.\r\n- Obezitatea - Excesul de grăsime corporală poate contribui la dezvoltarea rezistenței la insulină.\r\n- Hiperlipidemia - Niveluri ridicate de colesterol și trigliceride, asociate frecvent cu diabetul.\r\n- Guta - Creșterea nivelului de acid uric în sânge, ducând la inflamația articulațiilor.\r\n###SPACING2###\r\n\r\n#### Cauze ale diabetului zaharat\r\n- Diabet de tip 1 - Factori genetici și autoimunitari. Factori de mediu, cum ar fi infecțiile virale.\r\n- Diabet de tip 2 - Obezitatea și stilul de viață sedentar. Predispoziția genetică.Dieta bogată în zaharuri și grăsimi saturate.\r\n- Diabet gestațional - Modificările hormonale din timpul sarcinii afectează sensibilitatea la insulină.\r\n###SPACING2###\r\n\r\n#### Diagnostic\r\nDiagnosticul diabetului și al altor boli metabolice se realizează prin:\r\n- Teste de sânge - Glicemie à jeun: Nivelul de glucoză în sânge după post.Test de toleranță la glucoză orală (TTGO): Măsurarea glicemiei după administrarea unei băuturi dulci. Hemoglobina glicată (HbA1c): Indică nivelul mediu al glicemiei din ultimele 2-3 luni.\r\n- Teste pentru lipide - Colesterol total, LDL, HDL și trigliceride.\r\n- Analize de urină - Pentru detectarea glucozei sau proteinelor în urină.\r\n###SPACING2###\r\n\r\n#### Tratament\r\nTratamentul vizează menținerea glicemiei în limite normale și prevenirea complicațiilor:\r\n- Medicamente - Diabet de tip 1: Administrare de insulină (injectabilă sau cu pompă de insulină). Diabet de tip 2: Medicamente orale, cum ar fi metformina sau inhibitori ai SGLT2, iar în cazuri avansate, insulină.\r\n- Intervenții legate de stilul de viață - Dietă echilibrată, săracă în carbohidrați simpli și bogată în fibre. Activitate fizică regulată (cel puțin 150 de minute pe săptămână).\r\n- Monitorizarea greutății corporale.\r\n- Monitorizarea glicemiei - Măsurarea regulată a glicemiei cu glucometrul.\r\n###SPACING2###\r\n\r\n#### Complicatii ale diabetului\r\n- Complicații acute - Hipoglicemie: Scăderea excesivă a glicemiei. Hiperglicemie: Creșterea excesivă a glicemiei, care poate duce la cetoacidoză diabetică.\r\n- Complicații cronice - Retinopatia diabetică: Afectarea vaselor de sânge din retină.Nefropatia diabetică: Deteriorarea rinichilor. Neuropatia diabetică: Afectarea nervilor periferici. Boala cardiovasculară: Diabetul crește riscul de infarct și AVC.\r\n\r\n#### Prevenție\r\nPrevenția diabetului de tip 2 și a altor boli metabolice:\r\n- Menținerea unei greutăți corporale sănătoase - Prin dietă echilibrată și activitate fizică regulată. Adoptarea unei diete sănătoase. Consum moderat de carbohidrați complecși. Evitarea zaharurilor rafinate și a grăsimilor saturate.\r\n- Activitate fizică - Cel puțin 30 de minute de activitate fizică moderată zilnic.\r\n- Renunțarea la fumat - Fumatul crește riscul de complicații diabetice și cardiovasculare. \r\n- Monitorizarea regulată a glicemiei și colesterolului - Mai ales în cazul persoanelor cu factori de risc.\r\n\r\n###SPACING2###\r\nBolile metabolice, în special diabetul, reprezintă o provocare majoră pentru sănătatea publică, dar prin prevenție, diagnostic precoce și tratament adecvat, riscurile și complicațiile pot fi reduse semnificativ. Un stil de viață sănătos și monitorizarea regulată sunt esențiale pentru menținerea unei stări optime de sănătate metabolică.	3
4	Boli dermatologice	Bolile dermatologice afectează pielea, părul, unghiile și mucoasele, fiind frecvent întâlnite și variind de la afecțiuni ușoare, precum acneea, până la boli cronice, cum ar fi psoriazisul. Pielea, fiind cel mai mare organ al corpului, are un rol esențial în protecția organismului împotriva factorilor externi.	**Bolile dermatologice** afectează pielea, părul, unghiile și mucoasele, fiind frecvent întâlnite și variind de la afecțiuni ușoare, precum acneea, până la boli cronice, cum ar fi psoriazisul. Pielea, fiind cel mai mare organ al corpului, are un rol esențial în protecția organismului împotriva factorilor externi.\r\n#### Tipuri de boli dermatologice\r\n- Acneea - Inflamație a foliculilor piloși și a glandelor sebacee, manifestată prin coșuri, puncte negre și chisturi.\r\n- Psoriazisul - Afecțiune autoimună cronică, caracterizată prin plăci eritemato-scuamoase, adesea pe scalp, coate sau genunchi.\r\n- Eczema (dermatita atopică) - Inflamație cronică a pielii, manifestată prin mâncărime, roșeață și uscăciune.\r\n- Dermatita seboreică - Afectează scalpul și fața, provocând descuamare grasă și mâncărime.\r\n- Vitiligo - Pierderea pigmentului cutanat în anumite zone, datorită distrugerii melanocitelor.\r\n- Infecții cutanate - Bacteriene: Impetigo. Virale: Herpes simplex, veruci. Fungice: Tinea (piciorul atletului, pecingine).\r\n- Alopecia - Căderea părului, fie localizată, fie generalizată.\r\n- Melanomul - Cea mai gravă formă de cancer de piele, asociată cu expunerea excesivă la radiații UV.\r\n###SPACING2###\r\n\r\n#### Cauze ale bolilor dermatologice\r\n- Factori genetici - Predispoziție pentru psoriazis, vitiligo sau eczeme.\r\n- Factori de mediu - Expunerea excesivă la soare, poluare, contact cu substanțe iritante.\r\n- Infecții - Bacterii, viruși, ciuperci sau paraziți.\r\n- Dezechilibre hormonale - Acneea este frecvent asociată cu modificările hormonale din adolescență sau sarcină.\r\n- Factori autoimuni - Psoriazisul și vitiligo sunt asociate cu reacții autoimune.\r\n- Stres și stil de viață - Factorii psihologici pot agrava eczemele sau acneea.\r\n###SPACING2###\r\n\r\n#### Diagnostic\r\nDiagnosticul bolilor dermatologice se face pe baza examenului clinic și, în unele cazuri, prin investigații suplimentare:\r\n- Examen clinic dermatologic - Evaluarea vizuală a leziunilor cutanate.\r\n- Biopsia cutanată - Prelevarea unui fragment de piele pentru analiza microscopică, utilizată în cazul leziunilor suspecte.\r\n- Teste de laborator - Exudat pentru infecții bacteriene sau fungice. Analize serologice pentru boli autoimune sau alergii.\r\n- Dermatoscopia - Folosită pentru examinarea detaliată a alunițelor și pentru diagnosticarea melanomului.\r\n###SPACING2###\r\n\r\n#### Tratament\r\nTratamentul bolilor dermatologice variază în funcție de tipul și gravitatea afecțiunii:\r\n- Tratament medicamentos - Topice: Creme cu corticosteroizi, antifungice, antibiotice sau retinoizi. Sistemice: Imunosupresoare, antihistaminice, antibiotice orale sau biologice pentru psoriazis.\r\n- Fototerapie - Expunerea controlată la radiații UV pentru afecțiuni precum psoriazisul sau vitiligo.\r\n- Proceduri dermatologice - Crioterapie pentru veruci. Excizia chirurgicală a leziunilor suspecte. Tratament laser pentru cicatrici sau rozacee.\r\n- Îngrijire a pielii - Hidratarea pielii și evitarea factorilor iritanți.\r\n###SPACING2###\r\n\r\n#### Prevenție\r\nMăsurile preventive pot reduce riscul apariției bolilor dermatologice sau pot preveni agravarea lor:\r\n- Protecția solară - Utilizarea zilnică a produselor cu SPF pentru a preveni îmbătrânirea prematură și cancerul de piele.\r\n- Igiena adecvată - Curățarea regulată a pielii fără produse agresive.\r\n- Hidratarea pielii - Utilizarea cremelor emoliente pentru a preveni uscarea excesivă.\r\n- Evitarea alergenilor și iritanților - Evitarea produselor care conțin parfumuri sau substanțe chimice iritante.\r\n- Stil de viață sănătos - O dietă echilibrată, somn suficient și gestionarea stresului.\r\n- Monitorizarea alunițelor - Consult dermatologic periodic pentru a detecta orice modificare suspectă.\r\n\r\n###SPACING2###\r\nBolile dermatologice pot afecta calitatea vieții, dar majoritatea pot fi tratate sau controlate eficient cu diagnostic precoce și îngrijire corespunzătoare. O atenție constantă la sănătatea pielii și adoptarea unor măsuri preventive adecvate sunt esențiale pentru menținerea unui tegument sănătos.	4
1	Boli cardiovasculare	Bolile cardiovasculare reprezintă una dintre principalele cauze de mortalitate la nivel global, afectând inima și vasele de sânge. Aceste afecțiuni pot fi prevenite în mare măsură printr-un stil de viață sănătos, dar necesită atenție și tratament adecvat pentru a preveni complicațiile.	**Bolile cardiovasculare** reprezintă una dintre principalele cauze de mortalitate la nivel global, afectând inima și vasele de sânge. Aceste afecțiuni pot fi prevenite în mare măsură printr-un stil de viață sănătos, dar necesită atenție și tratament adecvat pentru a preveni complicațiile.\r\n#### Tipuri de boli cardiovasculare\r\n- Boala coronariană (cardiopatia ischemică) - Apare din cauza îngustării arterelor coronare, ceea ce reduce fluxul de sânge către inimă. Poate duce la angină pectorală sau infarct miocardic.\r\n- Insuficiența cardiacă - Inima nu mai pompează suficient sânge pentru a satisface nevoile organismului.\r\n- Aritmiile - Tulburări ale ritmului cardiac, cum ar fi fibrilația atrială sau tahicardia.\r\n- Hipertensiunea arterială - Tensiunea arterială ridicată care forțează inima să muncească mai mult.\r\n- Accidentul vascular cerebral (AVC) - Se produce atunci când fluxul de sânge către creier este întrerupt.\r\n- Bolile valvulare cardiace - Implică disfuncții ale valvelor cardiace, cum ar fi stenoza sau insuficiența valvulară.\r\n###SPACING2###\r\n\r\n#### Cauze ale bolilor cardiovasculare\r\n- Factori genetici - Predispoziția genetică poate juca un rol important.\r\n- Factori de stil de viață - Fumatul, alimentația nesănătoasă (bogată în grăsimi saturate, sare și zahăr), sedentarismul\r\n###SPACING2###\r\n\r\n#### Factori de risc asociați\r\n- Diabetul zaharat\r\n- Obezitatea\r\n- Dislipidemia (niveluri ridicate de colesterol)\r\n- Stresul cronic\r\n###SPACING2###\r\n#### Diagnostic\r\nDiagnosticul bolilor cardiovasculare presupune o evaluare detaliată care poate include:\r\n- Examen *clinic*\r\n- Ascultarea inimii, măsurarea tensiunii arteriale.\r\n- Teste de laborator\r\n- Analize de sânge pentru colesterol, trigliceride, glicemie.\r\n- Investigații imagistice\r\n- Electrocardiograma (ECG)\r\n- Ecocardiografia\r\n- Tomografia computerizată (CT) sau Rezonanța magnetică (RMN) cardiac\r\n- Teste funcționale\r\n- Test de efort\r\n- Monitorizare Holter\r\n###SPACING2###\r\n#### Tratament\r\nTratamentul bolilor cardiovasculare poate varia în funcție de tipul și severitatea afecțiunii:\r\n- Tratament medicamentos\r\n- Statine pentru reducerea colesterolului\r\n- Beta-blocante pentru controlul ritmului cardiac\r\n- Inhibitori ai enzimei de conversie (IEC) pentru tensiunea arterială\r\n- Intervenții chirurgicale sau proceduri\r\n- Angioplastie coronariană\r\n- Bypass coronarian\r\n- Implantare de pacemaker\r\n- Modificări ale stilului de viață\r\n- Renunțarea la fumat, adoptarea unei diete echilibrate, activitate fizică regulată.\r\n###SPACING2###\r\n#### Prevenție\r\nPrevenția este esențială pentru reducerea riscului bolilor cardiovasculare:\r\n- Adoptarea unei diete sănătoase\r\n- Consumul de fructe, legume, cereale integrale și evitarea grăsimilor saturate.\r\n- Activitate fizică regulată\r\n- Minimum 150 de minute de activitate moderată pe săptămână.\r\n- Controlul factorilor de risc\r\n- Monitorizarea tensiunii arteriale, glicemiei și colesterolului.\r\n- Gestionarea stresului\r\n- Tehnici de relaxare, cum ar fi meditația sau yoga.\r\n- Renunțarea la fumat\r\n###SPACING2###\r\nÎn concluzie, bolile cardiovasculare pot fi prevenite și tratate eficient printr-o combinație de modificări ale stilului de viață, monitorizare medicală și tratamente adecvate. Menținerea unei inimi sănătoase este cheia unei vieți lungi și active.	1
\.


--
-- TOC entry 3400 (class 0 OID 16501)
-- Dependencies: 218
-- Data for Name: Personal_Data; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Personal_Data" (id, cnp, "firstName", "lastName", address, "phoneNumber", "createdAt", "updatedAt", "userId") FROM stdin;
2	1970627245057	Lupusanschi	George	Str. Macului nr. 1	0758087965	2024-12-07 14:13:09.49	2024-12-07 14:13:09.49	1
5	1970627245055	Test	Doctor	Str. Macului nr. 1	0758087965	2024-12-07 15:39:20.62	2024-12-07 15:39:20.62	3
6	2801112245053	Gigela	Popescu	Str. Gigela nr. 1	0758088088	2024-12-07 16:43:52.834	2024-12-07 16:43:52.834	4
7	1900324015050	Dorian	Popa	Str. Chelutu, nr. 1	0769420420	2024-12-07 16:45:34.885	2024-12-07 16:45:34.885	5
\.


--
-- TOC entry 3402 (class 0 OID 16509)
-- Dependencies: 220
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."User" (id, email, password, role, "createdAt") FROM stdin;
1	test@gmail.com	$2b$10$ZkJqvZmhEO9c9n94U5qMJ.cW3ri5iD67HAFKJdd3ON9HpUvocBqtC	CLIENT	2024-12-07 14:10:55.645
4	gigela@yahoo.com	$2b$10$7qBe40iqKFOb7ak51NiDp.X2c1LWsxSXItk3.4TlC9ziRdy1uo4kO	CLIENT	2024-12-07 16:43:13.38
5	dorian@hatz.com	$2b$10$vT7OlRe7/.537vFSUXyzg.fDGe1C6Z9KKmZazLTgKuw7jXDaFyUr.	CLIENT	2024-12-07 16:44:32.153
3	doctor@gmail.com	123456	DOCTOR	2024-12-07 15:33:56.568
\.


--
-- TOC entry 3404 (class 0 OID 16517)
-- Dependencies: 222
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4aeca694-bdbc-4cf6-80a3-d344fbc716f1	47fa0486f2c83d9dc3f982a26ca083e9bb9f86a1bbd4e2a6684a7ec38350734a	2024-12-07 12:58:58.661865+00	20241207125858_init	\N	\N	2024-12-07 12:58:58.60851+00	1
7428d353-a545-4ba6-859e-d72a8476f2bf	47fa0486f2c83d9dc3f982a26ca083e9bb9f86a1bbd4e2a6684a7ec38350734a	2024-12-07 13:50:44.857257+00	20241207135044_init	\N	\N	2024-12-07 13:50:44.783942+00	1
\.


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 215
-- Name: FileS3_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."FileS3_id_seq"', 4, true);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 217
-- Name: Informatii_Categorie_Boala_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Informatii_Categorie_Boala_id_seq"', 4, true);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 219
-- Name: Personal_Data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Personal_Data_id_seq"', 7, true);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 221
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- TOC entry 3237 (class 2606 OID 16533)
-- Name: FileS3 FileS3_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."FileS3"
    ADD CONSTRAINT "FileS3_pkey" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16535)
-- Name: Informatii_Categorie_Boala Informatii_Categorie_Boala_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Informatii_Categorie_Boala"
    ADD CONSTRAINT "Informatii_Categorie_Boala_pkey" PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 16537)
-- Name: Personal_Data Personal_Data_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Personal_Data"
    ADD CONSTRAINT "Personal_Data_pkey" PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 16539)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 16541)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3238 (class 1259 OID 16542)
-- Name: Informatii_Categorie_Boala_imageId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Informatii_Categorie_Boala_imageId_key" ON public."Informatii_Categorie_Boala" USING btree ("imageId");


--
-- TOC entry 3239 (class 1259 OID 16543)
-- Name: Informatii_Categorie_Boala_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Informatii_Categorie_Boala_name_key" ON public."Informatii_Categorie_Boala" USING btree (name);


--
-- TOC entry 3242 (class 1259 OID 16544)
-- Name: Personal_Data_cnp_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Personal_Data_cnp_key" ON public."Personal_Data" USING btree (cnp);


--
-- TOC entry 3245 (class 1259 OID 16545)
-- Name: Personal_Data_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Personal_Data_userId_key" ON public."Personal_Data" USING btree ("userId");


--
-- TOC entry 3246 (class 1259 OID 16546)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3251 (class 2606 OID 16547)
-- Name: FileS3 FileS3_uploaderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."FileS3"
    ADD CONSTRAINT "FileS3_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3252 (class 2606 OID 16552)
-- Name: Informatii_Categorie_Boala Informatii_Categorie_Boala_imageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Informatii_Categorie_Boala"
    ADD CONSTRAINT "Informatii_Categorie_Boala_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES public."FileS3"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3253 (class 2606 OID 16557)
-- Name: Personal_Data Personal_Data_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Personal_Data"
    ADD CONSTRAINT "Personal_Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-04-10 12:12:11

--
-- PostgreSQL database dump complete
--

