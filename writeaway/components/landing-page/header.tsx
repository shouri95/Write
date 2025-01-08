import Link from 'next/link';

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
      }}
    >
      <div 
        style={{ 
          marginLeft: '1.5rem',
          fontSize: '1.25rem',
          fontWeight: 500,
          color: '#111827'
        }}
      >
        WriteAway
      </div>
      <div 
        style={{ 
          color: '#4B5563',
          fontSize: '1rem'
        }}
      >
        Bento Box
      </div>
      <Link href="/sign-in">
        <button 
          style={{
            marginRight: '1.5rem',
            backgroundColor: '#111827',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 150ms ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1F2937'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
        >
          Get Started
        </button>
      </Link>
    </header>
  );
};

export default Header;