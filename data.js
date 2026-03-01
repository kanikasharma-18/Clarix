const SUBJECTS = [
    { id: 'maths', name: 'Mathematics', icon: '➗' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'chem', name: 'Chemistry', icon: '🧪' }
];

const LEVELS = [
    { id: '11', name: '11th Grade' },
    { id: '12', name: '12th Grade' },
    { id: 'ug', name: 'Undergraduate' }
];

const KG = [
    // ================= MATHEMATICS =================
    // 11th Grade Maths (10 topics)
    { id: 'm11_sets', name: 'Sets & Relations', subject: 'maths', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/tyDKRlFX0Xg', notes: 'Sets are well-defined collections of objects. Relations define connections between elements of sets.' },
    { id: 'm11_trig', name: 'Trigonometry', subject: 'maths', level: '11', prereqs: ['m11_sets'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/PUB0TaZ7bCQ', notes: 'Study of relationships between side lengths and angles of triangles.' },
    { id: 'm11_complex', name: 'Complex Numbers', subject: 'maths', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/5PcpBw5HbBE', notes: 'Numbers expressed as a+bi, where i is the imaginary unit satisfying i² = -1.' },
    { id: 'm11_ineq', name: 'Linear Inequalities', subject: 'maths', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/nifmK0sI40E', notes: 'Expressions comparing two values using <, >, <=, or >=.' },
    { id: 'm11_pnc', name: 'Permutations & Combinations', subject: 'maths', level: '11', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/XqQTXW7XfYA', notes: 'Counting techniques for arrangements and selections of objects.' },
    { id: 'm11_seq', name: 'Sequences & Series', subject: 'maths', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/UoJvQ-M1W-0', notes: 'Arithmetic and Geometric progressions, and infinite series.' },
    { id: 'm11_lines', name: 'Straight Lines', subject: 'maths', level: '11', prereqs: ['m11_trig'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/Ym0x6jZb8-c', notes: 'Equations of lines in 2D coordinate geometry.' },
    { id: 'm11_conics', name: 'Conic Sections', subject: 'maths', level: '11', prereqs: ['m11_lines'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/HO2zAU3Eppo', notes: 'Curves obtained by intersecting a cone with a plane (circles, ellipses, parabolas, hyperbolas).' },
    { id: 'm11_limits', name: 'Limits & Derivatives', subject: 'maths', level: '11', prereqs: ['m11_seq', 'm11_trig'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/riXcZT2ICjA', notes: 'Foundations of calculus: behavior of functions near a point and rates of change.' },
    { id: 'm11_stat', name: 'Statistics & Probability', subject: 'maths', level: '11', prereqs: ['m11_pnc'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/xxpc-HPZH5M', notes: 'Measures of dispersion and basics of axiomatic probability.' },

    // 12th Grade Maths (10 topics)
    { id: 'm12_rel', name: 'Functions & Relations', subject: 'maths', level: '12', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/A8gMSLhF83w', notes: 'Types of relations (equivalence) and functions (one-one, onto).' },
    { id: 'm12_itf', name: 'Inverse Trigonometry', subject: 'maths', level: '12', prereqs: ['m12_rel'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/N-0_hTzZXZ0', notes: 'Principal value branches and properties of inverse trig functions.' },
    { id: 'm12_matrices', name: 'Matrices', subject: 'maths', level: '12', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/xyAuNHPsq-g', notes: 'Rectangular arrays of numbers used to solve linear systems.' },
    { id: 'm12_det', name: 'Determinants', subject: 'maths', level: '12', prereqs: ['m12_matrices'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/Ip3X9LOh2dk', notes: 'Scalar value computed from a square matrix.' },
    { id: 'm12_cont', name: 'Continuity & Differentiability', subject: 'maths', level: '12', prereqs: ['m12_itf'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/6kYyusBkb2o', notes: 'Advanced derivations using chain rule, implicit functions, etc.' },
    { id: 'm12_aod', name: 'Applications of Derivatives', subject: 'maths', level: '12', prereqs: ['m12_cont'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/L1Z0M62z3Sg', notes: 'Maxima, minima, tangents, normals, and increasing/decreasing functions.' },
    { id: 'm12_int', name: 'Integrals', subject: 'maths', level: '12', prereqs: ['m12_aod'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/rfG8ce4nNh0', notes: 'Anti-derivatives and definite integrals representing area.' },
    { id: 'm12_aoi', name: 'Applications of Integrals', subject: 'maths', level: '12', prereqs: ['m12_int'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/8Jg-BXZY2Qk', notes: 'Finding areas bounded by complex curves.' },
    { id: 'm12_diff', name: 'Differential Equations', subject: 'maths', level: '12', prereqs: ['m12_int'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/p_di4Zn4wz4', notes: 'Equations involving derivatives, focusing on first-order linear types.' },
    { id: 'm12_vec', name: 'Vectors & 3D Geometry', subject: 'maths', level: '12', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/fNk_zzaMoSs', notes: 'Vector algebra and equations of lines and planes in 3D space.' },

    // UG Maths (10 topics)
    { id: 'm_ug_real', name: 'Real Analysis', subject: 'maths', level: 'ug', prereqs: [], threshold: 80, videoUrl: 'https://www.youtube.com/embed/sqPh_BPSNc8', notes: 'Rigorous study of real numbers, sequences, series, and continuity.' },
    { id: 'm_ug_lin', name: 'Linear Algebra', subject: 'maths', level: 'ug', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/fNk_zzaMoSs', notes: 'Vector spaces, linear transformations, eigenvalues, and eigenvectors.' },
    { id: 'm_ug_multi', name: 'Multivariable Calculus', subject: 'maths', level: 'ug', prereqs: ['m_ug_lin'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/TrcCVD9EOOU', notes: 'Partial derivatives, multiple integrals, and vector calculus (Stokes, Divergence).' },
    { id: 'm_ug_abs', name: 'Abstract Algebra', subject: 'maths', level: 'ug', prereqs: ['m_ug_lin'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/VHWxQV00M5o', notes: 'Groups, rings, fields, and Galois theory.' },
    { id: 'm_ug_ode', name: 'Ordinary Differential Equations', subject: 'maths', level: 'ug', prereqs: ['m_ug_multi'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/p_di4Zn4wz4', notes: 'Existence/uniqueness theorems, linear systems, and boundary value problems.' },
    { id: 'm_ug_complex', name: 'Complex Analysis', subject: 'maths', level: 'ug', prereqs: ['m_ug_real'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/b5VUnapu-qs', notes: 'Analytic functions, contour integration (Cauchy), and singularities.' },
    { id: 'm_ug_top', name: 'Topology', subject: 'maths', level: 'ug', prereqs: ['m_ug_real'], threshold: 85, videoUrl: 'https://www.youtube.com/embed/id1Pnv_N1M4', notes: 'Topological spaces, compactness, connectedness, and metric spaces.' },
    { id: 'm_ug_num', name: 'Numerical Analysis', subject: 'maths', level: 'ug', prereqs: ['m_ug_ode'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/YpXq4A1E6wQ', notes: 'Algorithms for continuous mathematics (interpolation, numerical integration).' },
    { id: 'm_ug_prob', name: 'Probability Theory', subject: 'maths', level: 'ug', prereqs: ['m_ug_real'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/IYdiKeQ9xEI', notes: 'Measure-theoretic probability, random variables, and limit theorems.' },
    { id: 'm_ug_opt', name: 'Optimization', subject: 'maths', level: 'ug', prereqs: ['m_ug_lin', 'm_ug_multi'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/c1hM-rE9190', notes: 'Linear programming, convex optimization, and duality.' },

    // ================= PHYSICS =================
    // 11th Grade Physics (10 topics)
    { id: 'p11_units', name: 'Units & Measurements', subject: 'physics', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/u1H0vQzIfh4', notes: 'SI units, dimensional analysis, and error calculation.' },
    { id: 'p11_kin_1d', name: 'Motion in a Straight Line', subject: 'physics', level: '11', prereqs: ['p11_units'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/ZM8ECpBuQYE', notes: 'Displacement, velocity, acceleration, and kinematic equations.' },
    { id: 'p11_kin_2d', name: 'Motion in a Plane', subject: 'physics', level: '11', prereqs: ['p11_kin_1d'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/-EONn2sBfEU', notes: 'Vectors, projectile motion, and circular motion.' },
    { id: 'p11_nlm', name: 'Laws of Motion', subject: 'physics', level: '11', prereqs: ['p11_kin_2d'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds', notes: "Newton's laws, friction, and dynamics of circular motion." },
    { id: 'p11_wep', name: 'Work, Energy, Power', subject: 'physics', level: '11', prereqs: ['p11_nlm'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/2WS1sG9fhOk', notes: 'Work-energy theorem, conservation of mechanical energy, and collisions.' },
    { id: 'p11_com', name: 'System of Particles & Rotational Motion', subject: 'physics', level: '11', prereqs: ['p11_wep'], threshold: 85, videoUrl: 'https://www.youtube.com/embed/b-MZpwQgOQA', notes: 'Center of mass, torque, angular momentum, and moment of inertia.' },
    { id: 'p11_grav', name: 'Gravitation', subject: 'physics', level: '11', prereqs: ['p11_nlm'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/kxkFaBG6a-A', notes: "Kepler's laws, universal law of gravitation, and escape velocity." },
    { id: 'p11_solids', name: 'Mechanical Properties of Solids', subject: 'physics', level: '11', prereqs: ['p11_nlm'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/5UqW8n2_h94', notes: 'Stress, strain, Hooke’s law, and elastic moduli.' },
    { id: 'p11_fluids', name: 'Mechanical Properties of Fluids', subject: 'physics', level: '11', prereqs: ['p11_nlm'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/b5SqPiI4ZzE', notes: 'Pressure, Bernoulli’s principle, viscosity, and surface tension.' },
    { id: 'p11_thermo_prop', name: 'Thermal Properties of Matter', subject: 'physics', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/eA2zL1cQkKw', notes: 'Heat, temperature, thermal expansion, and heat transfer mechanisms.' },

    // 12th Grade Physics (10 topics)
    { id: 'p12_electro', name: 'Electric Charges & Fields', subject: 'physics', level: '12', prereqs: [], threshold: 80, videoUrl: 'https://www.youtube.com/embed/1xSQlwWGT8M', notes: "Coulomb's law, electric field lines, and Gauss's law." },
    { id: 'p12_pot', name: 'Electrostatic Potential & Capacitance', subject: 'physics', level: '12', prereqs: ['p12_electro'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/4172i_78g9o', notes: 'Potential due to point charges, equipotential surfaces, and capacitors.' },
    { id: 'p12_curr', name: 'Current Electricity', subject: 'physics', level: '12', prereqs: ['p12_pot'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/1xPjES-sHwg', notes: "Ohm's law, drift velocity, Kirchhoff's laws, and electrical circuits." },
    { id: 'p12_mag', name: 'Moving Charges & Magnetism', subject: 'physics', level: '12', prereqs: ['p12_curr'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/0G7Rk7-w3xQ', notes: "Magnetic force, Biot-Savart law, and Ampere's law." },
    { id: 'p12_emi', name: 'Electromagnetic Induction', subject: 'physics', level: '12', prereqs: ['p12_mag'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/vwIdZjjd8fo', notes: "Faraday's laws, Lenz's law, and motional EMF." },
    { id: 'p12_ac', name: 'Alternating Current', subject: 'physics', level: '12', prereqs: ['p12_emi'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/V-H_5v9kE3s', notes: 'AC voltage applied to LCR circuits, resonance, and transformers.' },
    { id: 'p12_emw', name: 'Electromagnetic Waves', subject: 'physics', level: '12', prereqs: ['p12_ac'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/m4t7gTmBK3g', notes: 'Displacement current and the electromagnetic spectrum.' },
    { id: 'p12_ray', name: 'Ray Optics', subject: 'physics', level: '12', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/I0_eO13e9Z8', notes: 'Reflection, refraction, lenses, and optical instruments.' },
    { id: 'p12_wave', name: 'Wave Optics', subject: 'physics', level: '12', prereqs: ['p12_ray'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/Iuv6hY6zsd0', notes: "Huygens principle, interference (Young's double slit), and diffraction." },
    { id: 'p12_mod', name: 'Modern Physics', subject: 'physics', level: '12', prereqs: ['p12_electro', 'p12_emw'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/1APmPqZGGWk', notes: 'Dual nature of radiation, atoms (Bohr model), and nuclei.' },

    // UG Physics (10 topics)
    { id: 'p_ug_cm', name: 'Classical Mechanics', subject: 'physics', level: 'ug', prereqs: [], threshold: 85, videoUrl: 'https://www.youtube.com/embed/ApZINzPncR0', notes: 'Lagrangian and Hamiltonian dynamics, central force motion.' },
    { id: 'p_ug_em', name: 'Electromagnetism', subject: 'physics', level: 'ug', prereqs: [], threshold: 85, videoUrl: 'https://www.youtube.com/embed/1xSQlwWGT8M', notes: "Maxwell's equations, boundary value problems, and electromagnetic waves." },
    { id: 'p_ug_qm1', name: 'Quantum Mechanics I', subject: 'physics', level: 'ug', prereqs: ['p_ug_cm'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/TcmGYeO0u9s', notes: 'Schrödinger equation, operator formalism, and 1D potentials.' },
    { id: 'p_ug_qm2', name: 'Quantum Mechanics II', subject: 'physics', level: 'ug', prereqs: ['p_ug_qm1'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/TcmGYeO0u9s', notes: 'Angular momentum, hydrogen atom, and perturbation theory.' },
    { id: 'p_ug_stat', name: 'Statistical Mechanics', subject: 'physics', level: 'ug', prereqs: ['p_ug_qm1'], threshold: 85, videoUrl: 'https://www.youtube.com/embed/Q5a-8rA2g04', notes: 'Ensemble theory, partition functions, and quantum statistics (Fermi/Bose).' },
    { id: 'p_ug_thermo', name: 'Advanced Thermodynamics', subject: 'physics', level: 'ug', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/xR5v_hEqEAE', notes: "Laws of thermodynamics, thermodynamic potentials, and Maxwell's relations." },
    { id: 'p_ug_math', name: 'Mathematical Methods', subject: 'physics', level: 'ug', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/TrcCVD9EOOU', notes: 'Complex analysis, Fourier series, and differential equations for physics.' },
    { id: 'p_ug_sol', name: 'Solid State Physics', subject: 'physics', level: 'ug', prereqs: ['p_ug_qm1', 'p_ug_stat'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/tS0uBv6PXZM', notes: 'Crystal structure, reciprocal lattice, phonons, and band theory.' },
    { id: 'p_ug_nuc', name: 'Nuclear & Particle Physics', subject: 'physics', level: 'ug', prereqs: ['p_ug_qm2'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/1APmPqZGGWk', notes: 'Nuclear models, decay processes, and the Standard Model of particle physics.' },
    { id: 'p_ug_optics', name: 'Modern Optics', subject: 'physics', level: 'ug', prereqs: ['p_ug_em'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/I0_eO13e9Z8', notes: 'Fourier optics, laser physics, and non-linear optics.' },

    // ================= CHEMISTRY =================
    // 11th Grade Chemistry (10 topics)
    { id: 'c11_mole', name: 'Some Basic Concepts (Mole)', subject: 'chem', level: '11', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/1xSQlwWGT8M', notes: 'Matter, atomic mass, molecular mass, and mole concept stoichiometry.' },
    { id: 'c11_atom', name: 'Structure of Atom', subject: 'chem', level: '11', prereqs: ['c11_mole'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/1APmPqZGGWk', notes: 'Bohr model, quantum mechanical model, quantum numbers, and electron configuration.' },
    { id: 'c11_period', name: 'Classification of Elements', subject: 'chem', level: '11', prereqs: ['c11_atom'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/0RRVV4Diomg', notes: 'Periodic table structure and trends in physical and chemical properties.' },
    { id: 'c11_bond', name: 'Chemical Bonding', subject: 'chem', level: '11', prereqs: ['c11_period'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/QXT4OVM4vXI', notes: 'Ionic/covalent bonds, VSEPR theory, valence bond theory, and molecular orbitals.' },
    { id: 'c11_thermo', name: 'Chemical Thermodynamics', subject: 'chem', level: '11', prereqs: ['c11_bond'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/xR5v_hEqEAE', notes: 'System types, work, heat, enthalpy, entropy, and Gibbs free energy.' },
    { id: 'c11_eq', name: 'Equilibrium', subject: 'chem', level: '11', prereqs: ['c11_thermo'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/g5wNg_dKsYY', notes: "Physical/chemical equilibrium, Le Chatelier's principle, and ionic equilibrium (pH, buffers)." },
    { id: 'c11_redox', name: 'Redox Reactions', subject: 'chem', level: '11', prereqs: ['c11_mole'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/lQ6FBA1HM3s', notes: 'Oxidation numbers, balancing redox equations, and basic electrochemistry concept.' },
    { id: 'c11_org_bas', name: 'Organic Chem: Basic Principles', subject: 'chem', level: '11', prereqs: ['c11_bond'], threshold: 85, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'IUPAC nomenclature, isomerism, and fundamental electronic effects (inductive, resonance).' },
    { id: 'c11_hydro', name: 'Hydrocarbons', subject: 'chem', level: '11', prereqs: ['c11_org_bas'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Alkanes, alkenes, alkynes properties and reactions, aromaticity of benzene.' },
    { id: 'c11_env', name: 'Environmental Chemistry', subject: 'chem', level: '11', prereqs: [], threshold: 60, videoUrl: 'https://www.youtube.com/embed/p_di4Zn4wz4', notes: 'Atmospheric pollution, water pollution, and green chemistry.' },

    // 12th Grade Chemistry (10 topics)
    { id: 'c12_sol', name: 'Solutions', subject: 'chem', level: '12', prereqs: ['c11_mole'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/9h2fOA2L_oA', notes: "Types of solutions, concentration terms, Raoult's law, and colligative properties." },
    { id: 'c12_electro', name: 'Electrochemistry', subject: 'chem', level: '12', prereqs: ['c11_redox', 'c11_eq'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/teTkvUtW4SA', notes: "Electrochemical cells, Nernst equation, conductance, and Kohlrausch's law." },
    { id: 'c12_kin', name: 'Chemical Kinetics', subject: 'chem', level: '12', prereqs: ['c11_thermo'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/7qOFtL3VEBc', notes: 'Rate of reaction, rate laws, order/molecularity, integrated rate equations, and Arrhenius equation.' },
    { id: 'c12_dblock', name: 'd and f Block Elements', subject: 'chem', level: '12', prereqs: ['c11_period'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/0RRVV4Diomg', notes: 'Transition metal properties, lanthanides, actinides, and coordination complexes.' },
    { id: 'c12_coord', name: 'Coordination Compounds', subject: 'chem', level: '12', prereqs: ['c12_dblock'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/QXT4OVM4vXI', notes: 'Ligands, IUPAC naming, Werner’s theory, VBT, and Crystal Field Theory (CFT).' },
    { id: 'c12_halo', name: 'Haloalkanes & Haloarenes', subject: 'chem', level: '12', prereqs: ['c11_hydro'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Preparation, properties, and nucleophilic substitution mechanisms (SN1, SN2).' },
    { id: 'c12_alc', name: 'Alcohols, Phenols & Ethers', subject: 'chem', level: '12', prereqs: ['c12_halo'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Nomenclature, preparation methods, acidic nature, and key chemical reactions.' },
    { id: 'c12_ald', name: 'Aldehydes, Ketones & Carboxylic Acids', subject: 'chem', level: '12', prereqs: ['c12_alc'], threshold: 85, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Nucleophilic addition reactions, acidity of carboxylic acids, and important name reactions.' },
    { id: 'c12_amine', name: 'Amines', subject: 'chem', level: '12', prereqs: ['c12_ald'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Structure, classification, basicity, preparation, and reactions of diazonium salts.' },
    { id: 'c12_bio', name: 'Biomolecules', subject: 'chem', level: '12', prereqs: ['c12_ald'], threshold: 70, videoUrl: 'https://www.youtube.com/embed/H8WJ2KENlK0', notes: 'Carbohydrates, proteins, enzymes, vitamins, and nucleic acids (DNA/RNA).' },

    // UG Chemistry (10 topics)
    { id: 'c_ug_qm', name: 'Quantum Chemistry', subject: 'chem', level: 'ug', prereqs: [], threshold: 80, videoUrl: 'https://www.youtube.com/embed/TcmGYeO0u9s', notes: 'Postulates of QM, particle in a box, rigid rotor, harmonic oscillator, and hydrogen atom.' },
    { id: 'c_ug_sym', name: 'Molecular Symmetry & Group Theory', subject: 'chem', level: 'ug', prereqs: [], threshold: 85, videoUrl: 'https://www.youtube.com/embed/QXT4OVM4vXI', notes: 'Symmetry elements, point groups, character tables, and applications to molecular orbitals.' },
    { id: 'c_ug_spectro', name: 'Spectroscopy', subject: 'chem', level: 'ug', prereqs: ['c_ug_qm'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/1xSQlwWGT8M', notes: 'Rotational (Microwave), Vibrational (IR), Electronic (UV-Vis), and NMR spectroscopy.' },
    { id: 'c_ug_thermo', name: 'Statistical Thermodynamics', subject: 'chem', level: 'ug', prereqs: [], threshold: 75, videoUrl: 'https://www.youtube.com/embed/Q5a-8rA2g04', notes: 'Microstates, ensembles, partition functions, and calculation of thermodynamic properties.' },
    { id: 'c_ug_org1', name: 'Stereochemistry & Reaction Mechanisms', subject: 'chem', level: 'ug', prereqs: [], threshold: 85, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Chirality, prochirality, conformational analysis, and advanced organic reaction mechanisms.' },
    { id: 'c_ug_om', name: 'Organometallic Chemistry', subject: 'chem', level: 'ug', prereqs: ['c_ug_sym'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/QXT4OVM4vXI', notes: '18-electron rule, metal carbonyls, and organometallic catalysis (e.g., Wilkinson catalyst).' },
    { id: 'c_ug_main', name: 'Main Group Chemistry', subject: 'chem', level: 'ug', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/0RRVV4Diomg', notes: 'Advanced descriptive chemistry of s and p block elements, boranes, silicates, and interhalogens.' },
    { id: 'c_ug_peri', name: 'Pericyclic Reactions & Photochemistry', subject: 'chem', level: 'ug', prereqs: ['c_ug_org1'], threshold: 80, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Woodward-Hoffmann rules, cycloadditions, sigmatropic rearrangements, and organic photochemistry.' },
    { id: 'c_ug_phys', name: 'Physical Organic Chemistry', subject: 'chem', level: 'ug', prereqs: ['c_ug_org1'], threshold: 75, videoUrl: 'https://www.youtube.com/embed/U7jL2K_wRkE', notes: 'Kinetics/thermodynamics of organic reactions, linear free energy relationships (Hammett equation).' },
    { id: 'c_ug_anal', name: 'Instrumental Analytical Chemistry', subject: 'chem', level: 'ug', prereqs: [], threshold: 70, videoUrl: 'https://www.youtube.com/embed/1xSQlwWGT8M', notes: 'Chromatography (HPLC, GC), Mass Spectrometry, and electroanalytical techniques.' }
];

// Note: The Question Bank (QB) is no longer hardcoded here.
// Clarix now interfaces with a Node.js backend to generate questions dynamically via the Gemini API.
