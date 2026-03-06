import { describe, it, expect } from 'vitest'; // or 'jest'
import { calcStaff, calcProg, calculateCapexTotal } from './helpers';

describe('Business Logic Helpers', () => {
  
  describe('calcStaff (Costes de Personal)', () => {
    it('calculates costs for internal staff (Plantilla) correctly', () => {
      // Scenario: 1 employee in total
      const staff = { tipo: 'Plantilla', salario: 30000 };
      const totalStaff = 1;
      const result = calcStaff(staff, totalStaff);
      
      // Expected calculations:
      // SS (33%) = 30000 * 0.33 = 9900
      // Provision (33 days) = (30000 / 365) * 33 = 2712 (rounded)
      // Extras (for 1 person):
      //   - Nomina: 20 * 12 = 240
      //   - Medico: 51
      //   - PRL (Bracket <= 5): 300 / 1 = 300
      //   - Total Extras: 240 + 51 + 300 = 591
      // Total Cost: 30000 + 9900 + 2712 + 591 = 43203
      
      expect(result.ss).toBe(9900);
      expect(result.provision).toBe(2712);
      expect(result.extras).toBe(591);
      expect(result.costeTotal).toBe(43203);
      expect(result.costeMes).toBe(Math.round(43203 / 12));
    });

    it('calculates costs for external staff (Autónomo/Externo) correctly', () => {
      const staff = { tipo: 'Autónomo', salario: 20000 };
      const result = calcStaff(staff, 5);
      
      // External staff should have 0 extra costs
      expect(result.ss).toBe(0);
      expect(result.provision).toBe(0);
      expect(result.extras).toBe(0);
      expect(result.costeTotal).toBe(20000);
    });

    it('distributes PRL costs correctly for larger teams', () => {
      // Scenario: 10 employees (Bracket 2: cost 550)
      const staff = { tipo: 'Plantilla', salario: 30000 };
      const totalStaff = 10;
      const result = calcStaff(staff, totalStaff);

      // Extras:
      //   - Nomina: 240
      //   - Medico: 51
      //   - PRL: 550 / 10 = 55
      //   - Total Extras: 240 + 51 + 55 = 346
      
      expect(result.extras).toBe(346);
    });
  });

  describe('calcProg (Márgenes de Programas)', () => {
    it('calculates margin and revenue correctly', () => {
      const prog = { precio: 100, coste: 60, sesiones: 10, pacientes: 5 };
      const result = calcProg(prog);

      // Margen: (100 - 60) / 100 = 0.4 (40%)
      // Ingresos: 100 * 10 * 5 = 5000
      expect(result.margen).toBe(0.4);
      expect(result.ingresos).toBe(5000);
    });

    it('handles zero price to avoid NaN', () => {
      const prog = { precio: 0, coste: 10, sesiones: 10, pacientes: 5 };
      const result = calcProg(prog);
      expect(result.margen).toBe(0);
      expect(result.ingresos).toBe(0);
    });
  });

  describe('calculateCapexTotal', () => {
    const items = [
      { concepto: 'Item 1', s: 100, m: 200, l: 300 },
      { concepto: 'Item 2', s: 50, m: 50, l: 50 },
    ];

    it('sums up items for a specific center scenario', () => {
      expect(calculateCapexTotal(items, 'S')).toBe(150); // 100 + 50
      expect(calculateCapexTotal(items, 'M')).toBe(250); // 200 + 50
      expect(calculateCapexTotal(items, 'L')).toBe(350); // 300 + 50
    });

    it('uses the TOTAL row if it exists instead of summing', () => {
      const itemsWithTotal = [
        ...items,
        { concepto: 'TOTAL INVERSIÓN INICIAL', s: 1000, m: 2000, l: 3000 }
      ];
      // Should return the explicit total, ignoring the sum of items
      expect(calculateCapexTotal(itemsWithTotal, 'S')).toBe(1000);
    });

    it('defaults to M if center is not provided', () => {
      expect(calculateCapexTotal(items)).toBe(250);
    });
  });
});