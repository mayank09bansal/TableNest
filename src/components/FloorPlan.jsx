import React from 'react';
import { Users, CheckCircle, Info, Plus } from 'lucide-react';

export const FloorPlan = ({
  tables,
  selectedTableIds = [],
  onToggleTable,
  reservedTableIds = [],
  guestCount = 2,
  restaurantName = 'Restaurant'
}) => {
  const selectedTablesList = tables.filter(t => selectedTableIds.includes(t.id));
  const totalDeposit = selectedTablesList.reduce((sum, t) => sum + (t.price || 500), 0);
  const totalCapacity = selectedTablesList.reduce((sum, t) => sum + t.capacity, 0);

  return (
    <div className="floor-plan-container">
      {/* Header with Title and Legend */}
      <div className="floor-plan-header">
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#fff', marginBottom: '4px' }}>
            Interactive Dining Floor Plan
          </h4>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
            Click one or more tables to select multiple seating positions for your party
          </p>
        </div>

        <div className="floor-legend">
          <div className="legend-item">
            <span className="legend-dot legend-available"></span>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-selected"></span>
            <span>Selected ({selectedTableIds.length})</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-booked"></span>
            <span>Genuinely Booked ({reservedTableIds.length})</span>
          </div>
        </div>
      </div>

      {/* Multi-Selection Hint Banner */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 16px',
          marginBottom: '20px',
          fontSize: '0.82rem',
          color: 'rgba(255, 255, 255, 0.85)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Plus size={15} style={{ color: '#FFB295' }} />
        <span>
          <strong>Multi-Table Selection Enabled:</strong> Click multiple available tables to combine seating for larger groups or celebrations. Prices will automatically sum up.
        </span>
      </div>

      {/* Interactive Table Layout */}
      <div className="floor-layout">
        {tables.map((table) => {
          const isSelected = selectedTableIds.includes(table.id);
          // Genuinely reserved only when booked in active reservations
          const isUnavailable = reservedTableIds.includes(table.id);

          return (
            <div
              key={table.id}
              className={`table-node ${isSelected ? 'selected' : ''} ${isUnavailable ? 'booked' : ''}`}
              onClick={() => {
                if (!isUnavailable) {
                  onToggleTable(table);
                }
              }}
              title={
                isUnavailable
                  ? 'Table already booked by another guest for this slot'
                  : isSelected
                  ? 'Click to remove table from selection'
                  : `Click to select ${table.number} (Deposit: ₹${table.price || 500})`
              }
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: isSelected ? '#FFE4D6' : 'rgba(255,255,255,0.6)', fontWeight: '700' }}>
                  {table.section}
                </span>
                {isSelected && (
                  <span style={{ background: '#FFFFFF', color: 'var(--primary)', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800' }}>
                    ✓
                  </span>
                )}
              </div>

              <div className="table-number">{table.number}</div>
              <div className="table-label">{table.label}</div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '6px' }}>
                <div className="table-capacity-pill">
                  <Users size={12} />
                  <span>{table.capacity} Guests</span>
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: isSelected ? '#FFFFFF' : '#FFB295' }}>
                  ₹{table.price || 500}
                </span>
              </div>

              {isUnavailable && (
                <span style={{ fontSize: '0.7rem', color: '#FF7B7B', marginTop: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  ● Booked
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Tables Multi-Callout */}
      {selectedTablesList.length > 0 && (
        <div
          style={{
            marginTop: '24px',
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.09)',
            border: '1.5px solid rgba(255, 255, 255, 0.24)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.9rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={18} style={{ color: '#FF9E79', flexShrink: 0 }} />
            <div>
              <span>
                Selected <strong>{selectedTablesList.length} {selectedTablesList.length === 1 ? 'Table' : 'Tables'}</strong>: {selectedTablesList.map(t => `${t.number} (₹${t.price})`).join(' + ')}
              </span>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                Combined Seating Capacity: <strong>{totalCapacity} Guests</strong>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: '700' }}>
              Combined Table Deposit
            </div>
            <span style={{ color: '#97F4A7', fontWeight: '800', fontSize: '1.15rem' }}>
              ₹{totalDeposit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
