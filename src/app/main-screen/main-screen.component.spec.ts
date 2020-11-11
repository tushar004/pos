import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScreenComponent } from './main-screen.component';
import { DataService } from './services/data-service.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('MainScreenComponent', () => {
  let component: MainScreenComponent;
  let fixture: ComponentFixture<MainScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainScreenComponent],
      providers: [DataService],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sale reset on close modal', () => {
    beforeEach(() => {
      spyOn(component, 'cancelSale');
      component.closeModal();
    });
    it('check if method to reset sale was called', () => {
      expect(component.cancelSale).toHaveBeenCalled();
    });
  });

  describe('check if multiple of six', () => {
    beforeEach(() => {
    });
    it('check if 6 is a multiple of 6', () => {
      expect(component.multipleSix(6)).toBeTruthy();
    });
    it('check if 21 is a multiple of 6', () => {
      expect(component.multipleSix(21)).toBeFalsy();
    });
    it('check if 60 is a multiple of 6', () => {
      expect(component.multipleSix(60)).toBeTruthy();
    });
  });

  describe('check if calculation method was called', () => {
    beforeEach(() => {
      spyOn(component, 'calculation');
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.deleteProduct(p);
    });
    it('check if method calculate all the tax, discount and total was called', () => {
      expect(component.calculation).toHaveBeenCalled();
    });
    it('check if method calculate all the tax, discount and total was called 2 times', () => {
      expect(component.calculation).toHaveBeenCalledTimes(2);
    });
  });

  describe('cancel sale', () => {
    beforeEach(() => {
      spyOn(component, 'calculation');
      component.cancelSale();
    });
    it('check if method calculate all the tax, discount and total was called', () => {
      expect(component.calculation).toHaveBeenCalled();
    });
  });

  describe('add product empty set', () => {
    beforeEach(() => {
      component.productList = new Map();

    });
    it('check the size and no duplicate element', () => {
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.addProduct(p);
      expect(component.productList.size).toEqual(1);
    });
    it('check the element present', () => {
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.addProduct(p);
      expect(component.productList.has(p)).toBeTruthy();
    });
    it('check the element freq', () => {
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.addProduct(p);
      expect(component.productList.get(p)).toEqual(2);
    });
  });

  describe('delete product', () => {
    beforeEach(() => {
      component.productList = new Map();

    });
    it('check if freq change after delete', () => {
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.addProduct(p);
      component.deleteProduct(p);
      expect(component.productList.size).toEqual(1);
    });
    it('check the element present after delete all', () => {
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.addProduct(p);
      component.deleteProduct(p);
      component.deleteProduct(p);

      expect(component.productList.size).toEqual(0);
    });
    it('check the element present after delete all', () => {
      const p = {
        name: 'comuter',
        price: '130',
        category: 'computers',
        description: '',
        image: 'comuter.jpg'
      };
      component.addProduct(p);
      component.addProduct(p);
      component.deleteProduct(p);
      component.deleteProduct(p);

      expect(component.productList.has(p)).toBeFalsy();
    });

  });


  afterEach(() => {
    fixture.destroy();
  });
});
