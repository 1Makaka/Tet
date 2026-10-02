import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Check, 
  RotateCcw, 
  CheckCheck, 
  Store,
  AlertCircle,
  Sparkles,
  Tag,
  Euro,
  Layers
} from 'lucide-react';
import { GROCERY_ITEMS, TOTAL_GROCERY_BUDGET } from '../data/initialData';
import { GroceryItemIcon } from './GroceryItemIcon';
import { playGoalAccomplished, playTactileTick, triggerHaptic } from '../utils/audio';

interface GroceryTabProps {
  groceryItems: Record<string, boolean>; // itemId -> boolean
  customPrices: Record<string, number>; // itemId -> custom price
  onToggleItem: (itemId: string) => void;
  onUpdatePrice: (itemId: string, newPrice: number) => void;
  onResetGrocery: () => void;
  onResetPricesToDefault: () => void;
  onCheckAllGrocery: () => void;
  soundEnabled: boolean;
}

export const GroceryTab: React.FC<GroceryTabProps> = ({
  groceryItems,
  customPrices,
  onToggleItem,
  onUpdatePrice,
  onResetGrocery,
  onResetPricesToDefault,
  onCheckAllGrocery,
  soundEnabled,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'bought'>('all');

  const handleToggle = (itemId: string, wasCompleted: boolean) => {
    if (soundEnabled) {
      if (!wasCompleted) {
        playGoalAccomplished();
      } else {
        playTactileTick();
      }
    }
    triggerHaptic(wasCompleted ? 15 : 30);
    onToggleItem(itemId);
  };

  // Helper to get active price of an item
  const getItemPrice = (item: typeof GROCERY_ITEMS[0]) => {
    return customPrices[item.id] !== undefined ? customPrices[item.id] : item.defaultPrice;
  };

  // Category labels in Russian
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'meat':
        return { label: 'Мясо и рыба', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'dairy':
        return { label: 'Молочные', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'carbs':
        return { label: 'Сложные углеводы', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'veggies':
        return { label: 'Овощи и фрукты', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      default:
        return { label: 'Бакалея', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
    }
  };

  // Calculations
  const totalCartSum = GROCERY_ITEMS.reduce((sum, item) => sum + getItemPrice(item), 0);
  const roundedTotal = Math.round(totalCartSum * 100) / 100;
  const totalLimit = TOTAL_GROCERY_BUDGET; // 50.00 €

  const isOverBudget = roundedTotal > totalLimit;
  const budgetDifference = Math.abs(Math.round((roundedTotal - totalLimit) * 100) / 100);

  // Spent in cart (bought items)
  const spentAmount = GROCERY_ITEMS.reduce((sum, item) => {
    return groceryItems[item.id] ? sum + getItemPrice(item) : sum;
  }, 0);
  const roundedSpent = Math.round(spentAmount * 100) / 100;
  const remainingToSpend = Math.max(0, Math.round((roundedTotal - roundedSpent) * 100) / 100);

  const boughtCount = Object.values(groceryItems).filter(Boolean).length;
  const totalCount = GROCERY_ITEMS.length;

  const filteredItems = GROCERY_ITEMS.filter((item) => {
    const isBought = !!groceryItems[item.id];
    if (filter === 'bought') return isBought;
    if (filter === 'pending') return !isBought;
    return true;
  });

  return (
    <div className="space-y-4 pb-20 pt-2 animate-in fade-in duration-300">
      {/* Top Budget Card */}
      <div className={`rounded-2xl border p-4 shadow-xl transition-all duration-300 ${
        isOverBudget 
          ? 'bg-gradient-to-br from-[#1c1218] via-[#1a141e] to-[#0d1624] border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
          : 'bg-gradient-to-br from-[#151f32] to-[#0d1624] border-emerald-500/40 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isOverBudget ? 'bg-red-500/10 border border-red-500/30 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            }`}>
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight">Калькулятор бюджета</h2>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  isOverBudget 
                    ? 'text-red-400 bg-red-500/10 border-red-500/30' 
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  Лимит: 50.00 €
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Меняй цены под свой магазин — расчет суммы на лету
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className={`text-lg font-mono font-black block ${
              isOverBudget ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {roundedTotal.toFixed(2)} €
            </span>
            <span className="text-[10px] text-slate-400">Итого сумма корзины</span>
          </div>
        </div>

        {/* Dynamic Budget Alert Banner */}
        <div className={`mt-3 p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
          isOverBudget
            ? 'bg-red-950/30 border-red-500/40 text-red-300'
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
        }`}>
          <div className="flex items-center gap-2">
            <AlertCircle className={`w-4 h-4 flex-shrink-0 ${isOverBudget ? 'text-red-400' : 'text-emerald-400'}`} />
            <span className="leading-snug">
              {isOverBudget ? (
                <>⚠️ <strong>Превышение лимита:</strong> на +{budgetDifference.toFixed(2)} € (снизьте цены или скорректируйте позиции)</>
              ) : (
                <>✅ <strong>В рамках недельного бюджета:</strong> запас {budgetDifference.toFixed(2)} €</>
              )}
            </span>
          </div>
          <button
            onClick={onResetPricesToDefault}
            className="text-[10px] text-slate-300 hover:text-white underline font-semibold flex-shrink-0 bg-[#0a0f1d] px-2 py-1 rounded-lg border border-[#22324d]"
            title="Восстановить цены Lidl/Aldi по умолчанию"
          >
            Сброс к Lidl
          </button>
        </div>

        {/* Breakdown 3 columns */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
          <div className="bg-[#0a0f1d] rounded-xl p-2.5 border border-[#22324d]">
            <span className="text-[10px] text-slate-400 block font-medium">Недельный лимит</span>
            <span className="text-xs font-mono font-bold text-white mt-0.5 block">50.00 €</span>
          </div>
          <div className="bg-[#0a0f1d] rounded-xl p-2.5 border border-[#22324d]">
            <span className="text-[10px] text-sky-400 block font-medium">Куплено (в корзине)</span>
            <span className="text-xs font-mono font-bold text-sky-300 mt-0.5 block">{roundedSpent.toFixed(2)} €</span>
          </div>
          <div className="bg-[#0a0f1d] rounded-xl p-2.5 border border-[#22324d]">
            <span className="text-[10px] text-emerald-400 block font-medium">Осталось купить</span>
            <span className="text-xs font-mono font-bold text-emerald-300 mt-0.5 block">{remainingToSpend.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* Filter and quick actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-[#0a0f1d] p-1 rounded-xl border border-[#22324d]">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Все ({totalCount})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'pending'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            В списке ({totalCount - boughtCount})
          </button>
          <button
            onClick={() => setFilter('bought')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'bought'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Куплено ({boughtCount})
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onCheckAllGrocery}
            className="h-8 px-2.5 rounded-xl bg-[#151f32] border border-[#22324d] text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px] font-medium"
            title="Отметить все товары как купленные"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Купить все</span>
          </button>
          <button
            onClick={onResetGrocery}
            className="h-8 w-8 rounded-xl bg-[#151f32] border border-[#22324d] text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-center"
            title="Сбросить отметки покупок"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grocery Items List - Full Russian Text without Truncation */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isBought = !!groceryItems[item.id];
          const currentPrice = getItemPrice(item);
          const categoryMeta = getCategoryLabel(item.category);

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-3.5 transition-all shadow-md ${
                isBought
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400'
                  : 'bg-[#151f32] border-[#22324d] hover:border-slate-600 text-slate-200'
              }`}
            >
              {/* Top row: Checkbox, Icon, Title and Price */}
              <div className="flex items-start justify-between gap-3">
                <div 
                  onClick={() => handleToggle(item.id, isBought)}
                  className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer select-none"
                >
                  {/* Big Checkbox */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                      isBought
                        ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                        : 'border-2 border-[#334b73] text-transparent hover:border-sky-400'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  {/* SVG Icon */}
                  <div className="flex-shrink-0">
                    <GroceryItemIcon iconKey={item.iconKey} />
                  </div>

                  {/* Full Russian Name & Category */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${categoryMeta.color}`}>
                        {categoryMeta.label}
                      </span>
                      {isBought && (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          Куплено ✓
                        </span>
                      )}
                    </div>
                    {/* Clear, bold Russian name without truncation */}
                    <h4 className={`text-sm font-bold mt-1 leading-snug break-words ${
                      isBought ? 'line-through text-slate-400' : 'text-white'
                    }`}>
                      {item.russianName || item.name}
                    </h4>
                  </div>
                </div>

                {/* Price Input with Live Change */}
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium mb-1">
                    Цена в магазине:
                  </span>
                  <div className="flex items-center gap-1 bg-[#0a0f1d] px-2.5 py-1.5 rounded-xl border border-[#22324d] focus-within:border-sky-400">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={currentPrice}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        onUpdatePrice(item.id, isNaN(val) ? 0 : val);
                      }}
                      className="w-16 bg-transparent text-right font-mono font-bold text-sm text-emerald-400 focus:outline-none focus:text-white"
                      title="Введите цену товара из чека"
                    />
                    <span className="text-xs font-mono font-bold text-slate-400">€</span>
                  </div>
                </div>
              </div>

              {/* Bottom row: Exact Packaging & German Supermarket Translation */}
              <div className="mt-3 pt-2.5 border-t border-[#22324d]/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-slate-400">Фасовка:</span>
                  <strong className="text-white font-medium">{item.quantity}</strong>
                </div>

                {/* German label clearly designated as supermarket translation */}
                <div className="flex items-center gap-1 text-[11px] text-sky-300 bg-[#0a0f1d] px-2 py-0.5 rounded-lg border border-[#22324d]">
                  <span className="text-slate-400 font-medium">Lidl/Aldi:</span>
                  <span className="font-mono font-semibold">🇩🇪 {item.germanName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Hint Footer */}
      <div className="p-3.5 rounded-2xl bg-[#0a0f1d] border border-[#22324d] text-xs text-slate-300 leading-relaxed space-y-1">
        <p className="flex items-center gap-1.5 font-bold text-white">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Подсказка для магазина в Германии:</span>
        </p>
        <p className="text-slate-400 text-[11px]">
          Вбивайте цены с реального чека Lidl, Aldi, Rewe или Kaufland в поле «Цена в магазине». Калькулятор мгновенно пересчитает общую сумму недели и покажет, уложились ли вы в лимит 50.00 €.
        </p>
      </div>
    </div>
  );
};
